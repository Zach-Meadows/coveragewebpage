import './App.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function App() {

    const baseEffectiveness = {
        'normal': [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1],
        'fighting': [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2],
        'flying': [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1],
        'poison': [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1],
        'ground': [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1],
        'rock': [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1],
        'bug': [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2],
        'ghost': [0, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 2, 1, 1, 0.5],
        'steel': [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1],
        'fire': [1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1],
        'water': [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1],
        'grass': [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1],
        'electric': [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1],
        'psychic': [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0],
        'ice': [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1],
        'dragon': [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1],
        'dark': [1, 0.5, 1, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 2, 1, 1, 0.5]
    }

    const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark']
    const [stateTypes, setTypes] = useState([undefined, undefined, undefined, undefined])
    const [learnType, setLearnType] = useState(undefined)
    const [learningAmove, setLearning] = useState(false)
    const [learnOptions, setLearnOptions] = useState([])
    const [stateEffectiveness, setEffectiveness] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [warningVisible, setWarning] = useState(false)


    useEffect(() => {
        console.log("state updated")
    });

    function learnTypeChange(type) {
        type = type.target.innerText
        console.log(`changing learn type to ${type}`)
        setLearnType(type)
        if (type === undefined) {
            setLearning(false)
        }
    }
    function count2(list){
        let totalTwos = 0
        for (let i = 0; i < list.length; i++) {
            if (list[i] === 2){
                totalTwos += 1
            }
            
        }
        return totalTwos
    }

    // FUNCTION TO CHANGE STATE TYPE BASED ON INDEX
    function typeChange(type, index) {
        type = String(type.target.innerText)
        var newTypes = []
        for (let i = 0; i < stateTypes.length; i++) {
            if (i === index) {
                if (type.length > 1 && type !== 'undefined') {
                    newTypes.push(type)
                }
                else {
                    newTypes.push(undefined)
                }
            }
            else {
                newTypes.push(stateTypes[i])
            }
        }
        setTypes(newTypes)
    }

    // ASSURE NO DUPES IN STATE
    function checkTypes() {
        var currentTypes = stateTypes
        var typeCheck = []
        var duplicates = false
        // if all are undefinded
        if (currentTypes.every(v => v === undefined)) {
            return []
        }
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
        if (duplicates) {
            return []
        }
        return typeCheck
    }

    function getTotal(event) {
        // if no duplicate in state 
        let newTypes = checkTypes()
        if (newTypes.length > 0) {
            if (warningVisible) {
                setWarning(false)
            }
            var totalEffective = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            // loops through new types
            for (let i = 0; i < newTypes.length; i++) {
                //loops through numbers of effectiveness of each type
                for (let j = 0; j < baseEffectiveness[newTypes[i]].length; j++) {
                    //if current type effectiveness better than 0, replace
                    if (baseEffectiveness[newTypes[i]][j] > totalEffective[j]) {
                        totalEffective[j] = baseEffectiveness[newTypes[i]][j]
                    }
                }
            }

            if (learnType !== undefined) {
                console.log(learnType)
                setLearning(true)
                // list of typesets
                let moveVariations = []
                // loop through base types and push a set of types into moveVariations
                // where each loop replaces 1 type
                let currentLearnType = learnType
                for (let i = 0; i < newTypes.length; i++) {
                    let currentTypeSet = [...newTypes]
                    currentTypeSet[i] = currentLearnType
                    moveVariations[i] = currentTypeSet

                }
                let effectivenessVariations = []
                // loop through moveVariations list
                for (let i = 0; i < moveVariations.length; i++) {
                    let currentEffectiveness = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    let currentTypeSet = moveVariations[i]
                    console.log(moveVariations)
                    console.log(currentTypeSet)
                    // loop through type in current variation
                    for (let i = 0; i < currentTypeSet.length; i++) {
                        let currentType = currentTypeSet[i]
                        console.log(currentType)
                        //loops through numbers of effectiveness of each type
                        for (let j = 0; j < baseEffectiveness[currentType].length; j++) {
                            //if current type effectiveness better than 0, replace
                            if (baseEffectiveness[currentType][j] > currentEffectiveness[j]) {
                                currentEffectiveness[j] = baseEffectiveness[currentType][j]
                            }
                        }

                    }
                    console.log(currentEffectiveness)
                    effectivenessVariations.push(currentEffectiveness)
                }
                setLearnOptions(effectivenessVariations)
                console.log(effectivenessVariations)



            }
            setEffectiveness(totalEffective)
            // get types from state
            // organize types by types var
            // get coverage from effectiveness
        }
        else {
            setWarning(true)
        }
    }

    return (
        <div className="App">
            <div className='frTitle'>FireRed Ironmon Coverage Visualizer</div>
            <p>Input 1 - 4 different move types and submit to see your overall coverage.</p>
            <p>You may also put in a 5th move type to see which move replacement has the best coverage.</p>
            {warningVisible ? <p className='warning'>need to submit at least 1 type and no duplicate types in first 4.</p> : <></>}
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
                <h5>Learning a move?</h5>
                <Autocomplete
                    disablePortal
                    id="learnTypeBox"
                    options={types}
                    onChange={(type) => learnTypeChange(type)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="learn move" />}
                />
                <Button onClick={(e) => getTotal(e)} variant="outlined">Submit</Button>
            </div>
            {learningAmove ? <div><h4>Current Coverage</h4><strong>{count2(stateEffectiveness)}</strong> total 2x Effectives</div> : <></>}
            <div className="effectivenessOutput">
                {types.map((item, i) => {
                    var numberClass = 'neutral'
                    if (stateEffectiveness[i] === 1 || stateEffectiveness.every((num) => num === 0)) {
                        numberClass = 'neutral'
                    }
                    else if (stateEffectiveness[i] < 1) {
                        numberClass = 'notEffective'
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
            {learningAmove ? <div className='effectivenessOutput'>{learnOptions.map((set, j) => {
                console.log(set)
                return <div>
                    <h4>Replacing type{j + 1}({stateTypes[j]})</h4>
                    <p><strong>{count2(set)}</strong> total 2x Effectives</p>
                    <div className='effectivenessOutput'>
                        {types.map((item, i) => {
                            var numberClass = 'neutral'
                            if (set[i] === 1 || set.every((num) => num === 0)) {
                                numberClass = 'neutral'
                            }
                            else if (set[i] < 1) {
                                numberClass = 'notEffective'
                            }
                            else {
                                numberClass = "superEffective"
                            }
                            return <div key={i} className="typeNode">
                                <div className={`${item} typeName`} value={item}>{item}</div>
                                <div className={`typeNumber ${numberClass}`}>{set[i]}</div>
                            </div>
                        })}</div>
                </div>
            })}</div> : <></>}
            {false ? <div><h3>Best Movesets By Single-Type Coverage</h3>
                <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}>Best Coverage Sets (mixed atk)</AccordionSummary><AccordionDetails>This is where stuff goes</AccordionDetails></Accordion>
                <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}>Best Coverage Sets (physical atk)</AccordionSummary><AccordionDetails>This is where stuff goes</AccordionDetails></Accordion>
                <Accordion><AccordionSummary expandIcon={<ExpandMoreIcon />}>Best Coverage Sets (special atk)</AccordionSummary><AccordionDetails>This is where stuff goes</AccordionDetails></Accordion> </div>
                : <></>}
            <div className='features'>
                <div>Features to come:</div>
                <ul>
                    <li><s>Move Learn coverage breakdown</s></li>
                    <li>Best Movesets by coverage</li>
                </ul>
            </div>
            <div className="footer">For questions and help go to <a target="_blank" rel='noreferrer' href='https://www.twitch.tv/qwarzach'>https://www.twitch.tv/qwarzach</a></div>
        </div>
    );
}

export default App;
