import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Main from './../components/Main';
import FindGame from './../components/find-game-stage/FindGame';
import SubmissionStage from './../components/game-stage/SubmissionStage';
import ResultsStage from './../components/results-stage/ResultsStage';
import VotingStage from './../components/voting-stage/VotingStage';

export default (
    <Router history={hashHistory}>
            <Route path='/' component={Main}>
                <Route path='game' component={FindGame} />
                <Route path='vote' component={VotingStage} />
                <Route path='results' component={ResultsStage} />
                <IndexRoute component={FindGame}/>
            </Route>
    </Router>
);