import React, { Component } from 'react';
import MainContainer from '../sharedComponents/mainContainer';
import { Form, Button } from 'react-bootstrap';

class GameMode extends Component {
    state = {

    }

    render() {
        return (
            <MainContainer>
                <Form action='/games' method='POST' className='gamesSelectionForm'>
                    <h5>Choose Your Difficulty:</h5>

                    <Form.Group className="gameDifficultySelection btn-group-toggle" data-toggle="buttons">
                        <Form.Label className="btn btn-secondary btn-lg btn-block">
                            <Form.Control type="radio" name="difficulty" value="easy" />
                            Easy
                        </Form.Label>
                        <Form.Label className="btn btn-secondary btn-lg btn-block">
                            <Form.Control type="radio" name="difficulty" value="medium" />
                            Medium
                        </Form.Label>
                        <Form.Label className="btn btn-secondary btn-lg btn-block">
                            <Form.Control type="radio" name="difficulty" value="hard" />
                            Hard
                        </Form.Label>
                    </Form.Group>

                    <Button type='submit' className='btn btn-danger btn-lg btn-block'>Kill Zombies</Button>

                </Form>
            </MainContainer >
        )
    }

}

export default GameMode;