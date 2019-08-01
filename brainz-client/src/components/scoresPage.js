import React, { Component } from 'react';
import io from 'socket.io-client';
import { TopScoresH1, Top3Li, RecentScoresH1, StyledDiv, StyledLi, StyledTitled, StyledUl, ModeLi } from '../styled-components/scoresPageStyles';
const moment = require('moment');

// open network preferences and grab ip and change it to yours
const ip = '10.150.41.155'

class Scores extends Component {
    state = {
        endpoint: `${ip}:3000`,
        highscores: false,
        recentscores: false,
        onLoad: false,
        holder: [{'wave': 0}]
    }

    componentDidUpdate = async () => {
        //console.log('component did update')
        const recent1 = document.getElementsByClassName('recent1');
        const recent2 = document.getElementsByClassName('recent2');
        const recent3 = document.getElementsByClassName('recent3');

        if (this.state.holder[0].wave === TypeError) {
            console.log('holder state is undefined')
        }   else if (this.state.holder[0].wave !== this.state.recentscores[0].wave &&
            this.state.holder[0].kills !== this.state.recentscores[0].kills &&
            this.state.holder[0].user_id !== this.state.recentscores[0].user_id &&
            this.state.holder[0].f_name !== this.state.recentscores[0].f_name
            ) {
                for (let i=0; i<3; i++) {
                    recent1[i].classList.add('blinking');
                    recent2[i].classList.add('blinking');
                    recent3[i].classList.add('blinking');
                }
                setTimeout(() => {
                    //console.log('timeout worked');
                    for (let i=0; i<3; i++) {
                        recent1[i].classList.remove('blinking');
                        recent2[i].classList.remove('blinking');
                        recent3[i].classList.remove('blinking');
                    }
                }, 1000);
            } 
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

            //console.log('this is data', data)
            if (data.length > this.state.highscores.length) {
                this.setState({
                    highscores: data,
                })
                //console.log('changed, put changing animation here')
            } else {
                //console.log('still the same, do nothing')
            }
        })

        socket.on('recentScores', data => {
            if (data[0].wave === this.state.recentscores[0].wave) {
                console.log('data is same', data)
                console.log(this.state.recentscores)
                this.setState({ holder: data })
            } else {
                console.log('data is different');
                //console.log(data);
                //console.log(this.state.recentscores); 
                this.setState({ holder: data })
            }

            if (this.state.onLoad === false) {
                this.setState({ recentscores: data })
                this.componentWillUnmount = () => {
                    console.log('this is test to see if it works')
                    socket.disconnect();
                    // clears the interval set below
                    //clearInterval(interval)
                }
            }

            //console.log('this is data', data)
            if (data.length > this.state.recentscores.length) {
                if (data === this.state.recentscores) {
                    console.log('data is same')
                } else (
                    console.log('data is different')
                )
                this.setState({
                    recentscores: data,
                })
                //console.log('changed')
            } else {
                //console.log('still the same')
                // if (data[0] === this.state.recentscores[0]) {
                //     console.log('data is same', data)
                //     console.log(this.state.recentscores)
                // } else (
                //     console.log('data is different')
                // )
            }
        })

        // sending back data to be stored in database
        // writing loop to test if leaderboards update correctly
        let foo;
        let interval;
        let counter = 0;
        interval = setInterval(() => {
            if (counter === 5) {
                clearInterval(interval)
                counter = 0;
            } else {
                const test = moment().format('L, h:mm:ss a');
                const number = Math.floor(Math.random() * 10)
                console.log('moment', test)
                foo = {'wave': number, 'kills': number+counter, 'user_id': 3, 'game_mode_id': 1, 'timestamp': test}
                socket.emit('game-results', foo)
                counter++
            }
        }, 5000)
        
        // socket.emit('testing', foo)

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
                                {data.f_name.substring(0,3)}
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
                    <StyledLi key={`data${index}`} className='recent1'>
                        {data.f_name.substring(0,3)}
                    </StyledLi>
                    )
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>WAVE</StyledTitled>
                {recentscores.map((data, index) => {
                    return (
                    <StyledLi key={`data${index}`} className='recent2'>
                        {data.wave}
                    </StyledLi>
                    )
                })}
                </StyledUl>
                <StyledUl>
                <StyledTitled>KILLS</StyledTitled>
                {recentscores.map((data, index) => {
                    return (
                    <StyledLi key={`data${index}`} className='recent3'>
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
