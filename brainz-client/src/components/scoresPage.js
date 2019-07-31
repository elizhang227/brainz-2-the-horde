import React, { Component } from 'react';
import io from 'socket.io-client';
import { TopScoresH1, Top3Li, RecentScoresH1, StyledDiv, StyledLi, StyledTitled, StyledUl, ModeLi } from '../styled-components/scoresPageStyles';
//const moment = require('moment');

const ip = '10.150.41.155'

class Scores extends Component {
    state = {
        endpoint: `${ip}:3000`,
        highscores: false,
        recentscores: false,
        onLoad: false
    }

    componentDidMount = async() => {
        // Load the scores initially before the setInterval is called in socket
        const initialScores = await this.loadInitialHighScores();
        const recentScores = await this.loadInitialRecentScores();
        this.setState({ 
            highscores: initialScores,
            recentscores: recentScores
        });

        const { endpoint } = this.state;
        const socket = io(endpoint);

        socket.on('highScores', data => {
            if (this.state.onLoad === false) {
                this.setState({ highscores: data })
                this.componentWillUnmount = () => {
                    console.log('this is test to see if it works')
                    socket.disconnect();
                }
            }
            console.log('this is data', data)
            if (data.length > this.state.highscores.length) {
                this.setState({
                    highscores: data,
                })
                console.log('changed, put changing animation here')
            } else {
                console.log('still the same, do nothing')
            }
        })

        socket.on('recentScores', data => {
            if (this.state.onLoad === false) {
                this.setState({ recentscores: data })
                this.componentWillUnmount = () => {
                    console.log('this is test to see if it works')
                    socket.disconnect();
                    // clears the interval set below
                    //clearInterval(interval)
                }
            }
            console.log('this is data', data)
            if (data.length > this.state.recentscores.length) {
                this.setState({
                    recentscores: data,
                })
                //console.log('changed')
            } else {
                //console.log('still the same')
            }
        })

        // sending back data to be stored in database
        // writing loop to test if leaderboards update correctly
        // let foo;
        // let interval;
        // let counter = 0;
        // interval = setInterval(() => {
        //     if (counter === 20) {
        //         clearInterval(interval)
        //         counter = 0;
        //     } else {
        //         const test = moment().format('L, h:mm:ss a');
        //         console.log('moment', test)
        //         foo = {'wave': counter, 'kills': 10+counter, 'user_id': 3, 'game_mode_id': 1, 'timestamp': test}
        //         socket.emit('game-results', foo)
        //         counter++
        //     }
        // }, 5000)
        
        // socket.emit('testing', foo)

    }

    getElement() {
        const element = document.getElementById('test');
        element.classList.add('blinking');
        console.log('this is element', element)
        return element;
    }

    loadInitialHighScores = async () => {
        const url = `http://${ip}:3000/highscores`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    }

    loadInitialRecentScores = async () => {
        const url = `http://${ip}:3000/recentscores`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    }

    render() {
        const { highscores, recentscores } = this.state;

        return (
        <div>
            <TopScoresH1 className='scoresHeader'>TOP TEN SCORES</TopScoresH1>
            {(highscores !== false) ? 
            <StyledDiv>
                <StyledUl>
                <StyledTitled>RANK</StyledTitled>
                {highscores.map((data, index) => {
                    if (index < 3) {
                        return (
                            <Top3Li key={`data${index}`}>
                                {index+1}
                            </Top3Li>
                        )
                    } else {
                        return (
                            <StyledLi key={`data${index}`}>
                                {index+1}
                            </StyledLi>
                        )
                    }
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>NAME</StyledTitled>
                {highscores.map((data, index) => {
                    if (index < 3) {
                        return (
                            <Top3Li key={`data${index}`}>
                                {data.f_name}
                            </Top3Li>
                        )
                    } else {
                        return (
                            <StyledLi key={`data${index}`}>
                                {data.f_name.substring(0,3)}
                            </StyledLi>
                        )
                    }
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>WAVE</StyledTitled>
                {highscores.map((data, index) => {
                    if (index < 3) {
                        return (
                            <Top3Li key={`data${index}`}>
                                {data.wave}
                            </Top3Li>
                        )
                    } else {
                        return (
                            <StyledLi key={`data${index}`}>
                                {data.wave}
                            </StyledLi>
                        )
                    }
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>KILLS</StyledTitled>
                {highscores.map((data, index) => {
                    if (index < 3) {
                        return (
                            <Top3Li key={`data${index}`}>
                                {data.kills}
                            </Top3Li>
                        )
                    } else {
                        return (
                            <StyledLi key={`data${index}`}>
                                {data.kills}
                            </StyledLi>
                        )
                    }
                })}
                </StyledUl>
            </StyledDiv>
            : ''
            }


            <RecentScoresH1 className='scoresHeader'>Recent Games</RecentScoresH1>
            {(recentscores !== false) ? 
            <StyledDiv>
                <StyledUl>
                <StyledTitled>NAME</StyledTitled>
                {recentscores.map((data, index) => {
                    return (
                    <StyledLi id='test' key={`data${index}`} onChange={(e) => this.getElement(e)}>
                        {data.f_name.substring(0,3)}
                    </StyledLi>
                    )
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>WAVE</StyledTitled>
                {recentscores.map((data, index) => {
                    return (
                    <StyledLi key={`data${index}`}>
                        {data.wave}
                    </StyledLi>
                    )
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>KILLS</StyledTitled>
                {recentscores.map((data, index) => {
                    return (
                    <StyledLi key={`data${index}`}>
                        {data.kills}
                    </StyledLi>
                    )
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>MODE</StyledTitled>
                {recentscores.map((data, index) => {
                    return (
                    <ModeLi key={`data${index}`}>
                        {data.difficulty}
                    </ModeLi>
                    )
                })}
                </StyledUl>
            </StyledDiv>
            : ''
            }
        </div>
        );
    }
}

export default Scores;
