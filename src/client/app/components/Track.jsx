import React from 'react';
import { connect } from 'react-redux';
import Sample from './Sample.jsx';
import Howler from 'react-howler';
import setPlaySequence from '../actions/setPlaySequence';
let lastId = 0;
let steps = [];
class Track extends React.Component {
  constructor(props){
    super(props);
    this.setPlaySequence();
  }
  setStepIndex() {
    if (lastId === 16){
      lastId = 0;
    }
    lastId++;
    return lastId;
  }
  mute(){
    this.props.playSequence[this.props.index].forEach(function(sample, index){
      console.log(sample.props.sound._muted, index);
      sample.props.sound._muted = !sample.props.sound._muted;
    })
    console.log('matrix:', this.props.playSequence)
  }
  setPlaySequence(){
    let ps = this.props.track.map((step, index) =>
      {
        return <Sample
                index={[this.props.index, index]}
                stepIndex={this.setStepIndex()}
                sound={new Howl( { src: `/api/sample/${this.props.sound}`} )}
               />

      }
    );
    this.props.setPlaySequence(ps, this.props.trackLength);
  }
  render() {

    return(
      <div>
        {this.props.track.map((step, index) =>
            <Sample
              playState={this.props.playState}
              key={[this.props.index, index]}
              stepIndex={this.setStepIndex()}
              step={step}
              index={[this.props.index, index]}
              sound={new Howl( {
                src: `/api/sample/${this.props.sound}`} )}
              toggleMatrix={this.props.toggleMatrix}
            />

        )}
        <button onClick={this.mute.bind(this)}>MUTE</button>
      </div>
    )
  };
}
function mapStateToProps(state) {
  return { playSequence: state.playSequence }
}
export default connect(mapStateToProps, { setPlaySequence: setPlaySequence })(Track);