import React from 'react';
import Howler from 'react-howler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import data from '../data.json';
import Track from '../components/Track.jsx';

console.log(data.matrix);
class Sequencer extends React.Component {
  render() {
    return(
      <div>
        {data.matrix.map((track, index) =>
            <Track key={index} track={track} data={data} index={index} sound={data.samples[index]}/>
        )}
      </div>
    )
  }
}

export default Sequencer;
