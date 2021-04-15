
const { extend, toPairs, zipObject, isString, isArray, find } = require("lodash")

const moment = require("moment")


// state transform utilities

let state2array = state => {
  let pairs = toPairs(state)
  return {
    template: pairs.map( p => p[0]),
    values: pairs.map( p => p[1])
  }
}

let array2state = (template, values) => zipObject(template, values)


// default integrators

const INTEGRATOR = {
    EULER    : [[1]],
    MIDPOINT : [[.5,.5],[0, 1]],
    HEUN     : [[1, 1],[.5,.5]],
    RALSTON  : [[2/3,2/3],[.25,.75]],
    K3       : [[.5,.5],[1,-1,2],[1/6,2/3,1/6]],
    SSP33    : [[1,1],[.5,.25,.25],[1/6,1/6,2/3]],
    SSP43    : [[.5,.5],[1,.5,.5],[.5,1/6,1/6,1/6],[1/6,1/6,1/6,1/2]],
    RK4      : [[.5,.5],[.5,0,.5],[1,0,0,1],[1/6,1/3,1/3,1/6]],
    RK38     : [[1/3,1/3],[2/3,-1/3,1],[1,1,-1,1],[1/8,3/8,3/8,1/8]]
};

const SEIR = require("./seir-model")

const DEFAULT_OPTIONS = {
  
  model:{
    
    params: SEIR.params,
    nextState: SEIR.nextState
  },

  simulation:{
      integrator: "RK4",
      stepRatio:40,
      time:{
        startsAt: new Date("2020.03.20"),
        endsAt: new Date(),
        stepBy: 1 // day
      }
  }

}


let CompartmetalModelSolver = class {

  constructor(options){


    this.options = extend({}, extend({}, DEFAULT_OPTIONS), options);
    
    this.options.simulation.integrator = isString(this.options.simulation.integrator) 
                                              ? INTEGRATOR[this.options.simulation.integrator] 
                                              : this.options.simulation.integrator
                                        || INTEGRATOR.RK4      
    
    this.options.simulation.time.startsAt = (this.options.simulation.time.startsAt) 
                                              ? moment(this.options.simulation.time.startsAt) 
                                              : moment(new Date("2020.03.20"))
    
    this.options.simulation.time.endsAt = (this.options.simulation.time.endsAt) 
                                              ? moment(this.options.simulation.time.endsAt) 
                                              : moment(new Date())
    
    this.options.simulation.time.stepBy = this.options.simulation.time.stepBy || 1 

    
    if (this.options.simulation.states  && isArray(this.options.simulation.states)) {
      this.states = this.options.simulation.states
    } else {
      
      let currentDate = moment(moment(this.options.simulation.time.startsAt).format("YYYY-MM-DD")+" 12:00","YYYY-MM-DD HH:mm")

      this.states = []

      while( this.options.simulation.time.endsAt.isSameOrAfter(currentDate)){
          this.states.push({
            date: currentDate.toDate(),
            variables:{}
          })
          currentDate.add(this.options.simulation.time.stepBy,"d")
        }
      
      this.states[0].variables = extend(this.states[0].variables, this.options.simulation.states.variables)
    }
  }


  _integrate(t,state){
    
    let m = this.options.simulation.integrator
    let f = this.options.model.nextState
    let params = this.options.model.params
    let y = state
    let h = this.options.simulation.time.stepBy


    let st = state2array(y.variables)
    
    for (var k=[],ki=0; ki<m.length; ki++) {
      var _y=st.values.slice(), dt = ki ? ((m[ki-1][0])*h) : 0;
      for (var l=0; l<_y.length; l++) for (var j=1; j<=ki; j++) _y[l]=_y[l]+h*(m[ki-1][j])*(k[ki-1][l]);
    
      k[ki] = state2array( f(t+dt, state , params, dt)).values 
     
    }

    for (var r=st.values.slice(),l=0; l<_y.length; l++) for (var j=0; j<k.length; j++) r[l]=r[l]+h*(k[j][l])*(m[ki-1][j]);
    return array2state(st.template, r);
  }


  solve(){
     
     this.states.forEach( (s,index) => {
        s.variables = (index == 0) ? s.variables : this._integrate(index,this.states[index-1])
     })

     if( this.options.simulation.outputs ) {
        let buf = this.states.map(s=>s).map( (s,index) => {
          let res = {}
          Object.keys(this.options.simulation.outputs).forEach( key => {
            res[key] = this.options.simulation.outputs[key]( s, this.options.model.params, this.states, index )
          })
          return {
            date: s.date,
            variables: res
          }
       })
       this.states = buf 
     } 

     return this 
  }
}  


module.exports = {
  INTEGRATOR,
  solve: options => {
    let solver = new CompartmetalModelSolver(options)
    return solver.solve().states
  }
}
