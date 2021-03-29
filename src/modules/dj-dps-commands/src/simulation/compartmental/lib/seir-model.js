
let params = {
	TIME_TO_DEATH: 				32,
	POPULATION: 				7e6,
	
	I0: 						1,
	R0: 						2.2, //basic reproductio number
	

	D_INCUBATION: 				5.2, // incubation period days
  	D_INFECTIOUS: 				2.9, // infected period days
  	D_RECOVERY_MILD: 			14 - 2.9, 
  	D_RECOVERY_SEVERE: 			31.5 - 2.9,
  	D_HOSPITAL_LAG: 			5,
  	D_DEATCH: 					32 - 2.9,
  	
  	CFR: 						0.02,  
  	
  	INFECTION_TIME: 			100,
  	
  	INTERVENTION_TIME: 			100,
 	OM_INTERVENTION_AMOUNT: 	2/3,
 	INTERVENTION_AMOUNT: 		1-2/3,
  	
  	TIME: 						220,
  	XMAX: 						110000,
 	DT: 						2,
 	P_SEVERE: 					0.2,
  	DURATION: 					7*12*1e10
}



let nextState = (timestamp, state, params, interval) => {

	// define koefficients
	let alpha, beta, gama;

	// calk it


	if (timestamp > params.INTERVENTION_TIME && timestamp < params.INTERVENTION_TIME + params.DURATION){
        beta = params.INTERVENTION_AMOUNT * params.R0 / params.D_INFECTIOUS
      } else if (timestamp > params.INTERVENTION_TIME + params.DURATION) {
        beta = 0.5 * params.R0 / params.D_INFECTIOUS (D_infectious)        
      } else {
        beta = params.R0 / params.D_INFECTIOUS
      }
      
      alpha     = 1 / params.D_INCUBATION
      gamma 	= 1 / params.D_INFECTIOUS
    
    // calk next state  
      
      let S        =  state.susectable 					// Susectable
      let E        =  state.exposed 					// Exposed
      let I        =  state.infectious 					// Infectious 
      let Mild     =  state.recoveringMild 				// Recovering (Mild)     
      let Severe   =  state.severeAtHome 				// Recovering (Severe at home)
      let Severe_H =  state.severeInHospital 			// Recovering (Severe in hospital)
      let Fatal    =  state.fatal 						// Recovering (Fatal)
      let R_Mild   =  state.recoveredMild 				// Recovered
      let R_Severe =  state.recoveredSever 				// Recovered
      let R_Fatal  =  state.dead 						// Dead

      let p_severe = params.P_SEVERE
      let p_fatal  = params.CFR
      let p_mild   = 1 - params.P_SEVERE - params.CFR

      let dS        = -beta * I * S
      let dE        =  beta * I * S - alpha * E
      let dI        =  alpha * E - gamma * I
      let dMild     =  p_mild * gamma * I   - (1 / params.D_RECOVERY_MILD ) * Mild
      let dSevere   =  p_severe * gamma * I - ( 1 / params.D_HOSPITAL_LAG ) * Severe
      let dSevere_H =  ( 1 / params.D_HOSPITAL_LAG ) * Severe - ( 1 / params.D_RECOVERY_SEVERE ) * Severe_H
      let dFatal    =  p_fatal * gamma * I  - ( 1 / params.D_DEATCH ) * Fatal
      let dR_Mild   =  ( 1 / params.D_RECOVERY_MILD ) * Mild
      let dR_Severe =  ( 1 / params.D_RECOVERY_SEVERE ) * Severe_H
      let dR_Fatal  =  ( 1 / params.D_DEATCH ) * Fatal

      // return next state

    return {
		susectable: dS,
  		exposed: dE, 	
  		infectious: dI,  
  		recoveringMild: dMild,     
  		severeAtHome: dSevere,
  		severeInHospital: dSevere_H,
  		fatal: dFatal,
  		recoveredMild: dR_Mild,
  		recoveredSever: dR_Severe,
 		dead: dR_Fatal
	}       
}


module.exports = {
	params,
	nextState
}