import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


function App() {

    const baseEffectiveness = {
        'normal': [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1],
        'fighting': [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2],
        'flying': [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1],
        'poison': [1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1],
        'ground': [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1],
        'rock': [1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1],
        'bug': [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2],
        'ghost': [0,1,1,1,1,1,1,2,0.5,1,1,1,1,2,1,1,0.5],
        'steel': [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1],
        'fire': [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1],
        'water': [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1],
        'grass': [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1],
        'electric': [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1],
        'psychic': [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0],
        'ice': [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1],
        'dragon': [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1],
        'dark': [1,0.5,1,1,1,1,1,2,0.5,1,1,1,1,2,1,1,0.5]
    }

    const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark']
    const [stateTypes, setTypes] = useState([undefined, undefined, undefined, undefined])
    const [stateEffectiveness, setEffectiveness] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    const [stateCurrentTypes, setCurrentTypes] = useState([])

    useEffect(() => {
        console.log(stateCurrentTypes)
        // // Update the document title using the browser API
        // if (checkTypes().length > 0 && checkTypes().length !== stateCurrentTypes.length) {
        //     console.log(stateCurrentTypes)
        //     console.log(checkTypes())
        //     console.log('type(s) checked!')
        //     setCurrentTypes(checkTypes())
            
        //     // get types from state
        //     // organize types by types var
        //     // get coverage from effectiveness
        // }
        // else {
        //     console.log(checkTypes())
        //     console.log(checkTypes().length)
        //     console.log(stateCurrentTypes)
        //     console.log(stateCurrentTypes.length)
        // }
      });

    // FUNCTION TO CHANGE STATE TYPE BASED ON INDEX
    function typeChange(type, index) {
        type = String(type.target.innerText)
        console.log(type)
        console.log(type.length)
        var newTypes = []
        for (let i = 0; i < stateTypes.length; i++) {
            if (i === index) {
                if (type.length > 1 && type !== 'undefined'){
                newTypes.push(type)
                }
                else{
                    newTypes.push(undefined)
                }
            }
            else {
                newTypes.push(stateTypes[i])
            }
        }
        console.log(newTypes)
        setTypes(newTypes)
    }

    // ASSURE NO DUPES IN STATE
    function checkTypes() {
        var currentTypes = stateTypes
        var typeCheck = []
        var duplicates = false
        // if all are undefinded
        if (currentTypes.every(v => v === undefined)){
            return []
        }
        console.log('after all undefinded')
        for (let i = 0; i < currentTypes.length; i++) {
            // if current is undefinded, skip
            if (currentTypes[i] === undefined) {
                continue
            }
            // if current is type, and not in typeCheck add it
            else if (!typeCheck.includes(currentTypes[i])) {
                typeCheck.push(currentTypes[i])
            }
            // if type is in typeCheck, we have duplicates
            else {
                duplicates = true
            }
        }
        if (duplicates){
            return []
        }
        return typeCheck
    }

    function getTotal(event) {
        // if no duplicate in state 
        if (checkTypes().length > 0) {
            var newTypes = checkTypes()
            console.log(newTypes)
            setCurrentTypes(newTypes)
            var totalEffective = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            for (let i = 0; i < newTypes.length; i++) {
                for (let j = 0; j < baseEffectiveness[newTypes[i]].length; j++) {
                    if (baseEffectiveness[newTypes[i]][j] > totalEffective[j]) {
                        totalEffective[j] = baseEffectiveness[newTypes[i]][j]
                    }
                }
            }
            console.log(totalEffective)
            setEffectiveness(totalEffective)
            // get types from state
            // organize types by types var
            // get coverage from effectiveness
        }
        else {
            console.log('need to submit at least 1 type and no duplicate types')
        }
    }

    return (
        <div className="App">
            <div className='frTitle'>FireRed Ironmon Coverage Visualizer</div>
            <p>Input 1 - 4 different move types and submit to see your overall coverage</p>
            <div className="types">
                <Autocomplete
                    disablePortal
                    id="typeBox1"
                    options={types}
                    onChange={(type) => typeChange(type, 0)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="type1" />}
                />
                <Autocomplete
                    disablePortal
                    id="typeBox2"
                    options={types}
                    onChange={(type) => typeChange(type, 1)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="type2" />}
                />
                <Autocomplete
                    disablePortal
                    id="typeBox3"
                    options={types}
                    onChange={(type) => typeChange(type, 2)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="type3" />}
                />
                <Autocomplete
                    disablePortal
                    id="typeBox4"
                    options={types}
                    onChange={(type) => typeChange(type, 3)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="type4" />}
                />
                {/* MAKE BUTTON SUBMIT TO GET TOTAL */}
                <Button onClick={(e) => getTotal(e)} variant="outlined">Submit</Button>
            </div>
            <div className="effectivenessOutput">
                {types.map((item, i) => {
                    var numberClass = 'neutral'
                    if (stateEffectiveness[i] < 1 && stateEffectiveness[i] !== 0) {
                        numberClass = 'notEffective'
                    }
                    else if (stateEffectiveness[i] === 1 || stateEffectiveness[i] === 0){
                        numberClass = 'neutral'
                    }
                    else {
                        numberClass = "superEffective"
                    }
                    return <div key={i} className="typeNode">
                        <div className={`${item} typeName`} value={item}>{item}</div>
                        <div className={`typeNumber ${numberClass}`}>{stateEffectiveness[i]}</div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
