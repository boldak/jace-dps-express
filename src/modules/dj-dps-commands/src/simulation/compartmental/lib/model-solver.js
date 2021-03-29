const { extend, toPairs, zipObject, isString } = require("lodash")
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



var integrate = (
  m,
  f,
  params,
  y,
  t,
  h
) => {
    
  let state = state2array(y)

  for (var k=[],ki=0; ki<m.length; ki++) {
    var _y=state.values.slice(), dt = ki ? ((m[ki-1][0])*h) : 0;
    for (var l=0; l<_y.length; l++) for (var j=1; j<=ki; j++) _y[l]=_y[l]+h*(m[ki-1][j])*(k[ki-1][l]);
    // k[ki]=f(t+dt,_y,dt);
    k[ki] = state2array( f(t+dt, array2state(state.template, _y) , params, dt)).values 
   
  }
  
  for (var r=state.values.slice(),l=0; l<_y.length; l++) for (var j=0; j<k.length; j++) r[l]=r[l]+h*(k[j][l])*(m[ki-1][j]);
  return array2state(state.template, r);
}



// Default SEIR ODE

const SEIR = require("./seir-model")

const DEFAULT_OPTIONS = {
  
  model:{
    
    initialState:{
      susectable: 1 - SEIR.params.I0 / SEIR.params.POPULATION,
      exposed: 0,  
      infectious: SEIR.params.I0 / SEIR.params.POPULATION,  
      recoveringMild: 0,     
      severeAtHome: 0,
      severeInHospital: 0,
      fatal: 0,
      recoveredMild: 0,
      recoveredSever: 0,
      dead: 0
    },

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

///////////////////////////////////////////////////////////////



let solve = (options => {
  
  options = extend({}, DEFAULT_OPTIONS, options)
  options.simulation.integrator = isString(options.simulation.integrator) ? INTEGRATOR[options.simulation.integrator] : options.simulation.integrator
  
  options.simulation.time.startsAt = (options.simulation.time.startsAt) ? moment(options.simulation.time.startsAt) : moment(new Date("2020.03.20"))
  options.simulation.time.endsAt = (options.simulation.time.endsAt) ? moment(options.simulation.time.endsAt) : moment(new Date())
  options.simulation.time.stepBy = options.simulation.time.stepBy || 1 

    
  let currentDate = moment(options.simulation.time.startsAt.toDate())

  let states = []

  while( options.simulation.time.endsAt.isSameOrAfter(currentDate)){
      states.push({
        date: currentDate.toDate()
      })
      currentDate.add(options.simulation.time.stepBy,"d")
    }

   let currentState = extend({}, options.model.initialState)
   let currentTimestamp = 0
 
   states = states.map( (s, index) => {

      currentState = integrate(
        options.simulation.integrator,
        options.model.nextState,
        options.model.params,
        currentState,
        currentTimestamp, 
        options.simulation.time.stepBy
      );

      s.state = currentState
      currentTimestamp += options.simulation.time.stepBy
      return s  
   }) 

  return states

})


module.exports = {
  INTEGRATOR,
  solve
}
