import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {createRepLog, deleteRepLog, getRepLogs} from "../api/rep_log_api";

export default class ReplogApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightedRowId: null,
      repLogs: [],
      numberOfHearts: 1,
      isLoaded: false,
      isSavingNewRepLog: false,
      successMessage: '',
      newRepLogValidationErrorMessage: '',
    }

    this.successMessageTimeoutHandle = 0

    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleAddRepLog = this.handleAddRepLog.bind(this)
    this.handleHeartChange = this.handleHeartChange.bind(this)
    this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this)
  }

  componentDidMount() {
    getRepLogs().then(data => this.setState({
      repLogs: data,
      isLoaded: true
    }))
  }

  componentWillUnmount() {
    clearTimeout(this.successMessageTimeoutHandle)
  }

  handleHeartChange(heartCount) {
    this.setState({numberOfHearts: heartCount})
  }

  handleRowClick(repLogId) {
    this.setState({highlightedRowId: repLogId})
  }

  handleAddRepLog(item, reps) {
    const newRep = {
      reps,
      item,
    }

    this.setState({
      isSavingNewRepLog: true
    })

    const newState = {
      isSavingNewRepLog: false
    }

    createRepLog(newRep)
      .then(repLog => {
        this.setState(prevState => {
          const newRepLogs = [...prevState.repLogs, repLog];

          return ({
            ...newState,
            repLogs: newRepLogs,
            newRepLogValidationErrorMessage: '',
          })
        })

        this.setSuccessMessage('Rep Log Saved!')
      })
      .catch(error => {
        error.response.json().then(errorsData => {
          const errors = errorsData.errors
          const firstError = errors[Object.keys(errors)[0]]

          return ({
            ...newState,
            newRepLogValidationErrorMessage: firstError,
          })
        })
      })
  }

  setSuccessMessage(message) {
    this.setState({
      successMessage: message
    })

    clearTimeout(this.successMessageTimeoutHandle)
    this.successMessageTimeoutHandle =  setTimeout(() => {
      this.setState({
        successMessage: ''
      })
      this.successMessageTimeoutHandle = 0
    }, 3000)
  }

  handleDeleteRepLog(id) {

    this.setState(prevState => {
      return {
        repLogs: prevState.repLogs.map(repLog => {
          if (repLog.id !== id) {
            return repLog
          }

          return {...repLog, isDeleting: true}
        })
      }
    })

    deleteRepLog(id).then(() => {
      this.setState(oldState => ({
        repLogs: oldState.repLogs.filter(repLog => repLog.id !== id)
      }))

      this.setSuccessMessage('Item was Un-Lifted!')
    })
  }

  render() {
    return (
      <RepLogs
        {...this.props}
        {...this.state}
        onRowClick = {this.handleRowClick}
        onAddRepLog= {this.handleAddRepLog}
        onHeartChange= {this.handleHeartChange}
        onDeleteRepLog= {this.handleDeleteRepLog}
      />
    )
  }
}

ReplogApp.propTypes = {
  withHeart: PropTypes.bool,
  itemOptions: PropTypes.array,
}

RepLogApp.defaultProps = {
  itemOptions: []
}
