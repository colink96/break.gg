import React from 'react'
import {gotSingleComp} from '../store/competition'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  singleComp: state.competition.singleComp
})

const mapDispatchToProps = dispatch => ({
  getSingleComp: id => dispatch(gotSingleComp(id))
})

class DisconnectedSingleComp extends React.Component {
  constructor() {
    super()
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.props.getSingleComp(this.props.match.params.id)
    this.setState({mounted: true})
  }

  render() {
    return (
      <div>
        {this.state.mounted && (
          <div>
            <h1>{this.props.singleComp.name}</h1>
            <h4>{this.props.singleComp.description}</h4>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleComp
)
