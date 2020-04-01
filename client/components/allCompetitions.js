import React from 'react'
import {connect} from 'react-redux'
import {gotAllComps} from '../store/competition'
import {Competition} from './competition'

class DisconnectedAllComps extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getAllComps()
  }

  render() {
    return (
      <div>
        {this.props.allComps.length &&
          this.props.allComps.map(comp => {
            return <Competition key={comp.id} comp={comp} />
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allComps: state.competition.allComps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllComps: () => dispatch(gotAllComps())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAllComps
)
