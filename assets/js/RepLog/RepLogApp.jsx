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
      successMessage: ''
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

    createRepLog(newRep)
      .then(repLog => {
        this.setState(prevState => {
          const newRepLogs = [...prevState.repLogs, repLog];

          return {
            repLogs: newRepLogs,
            isSavingNewRepLog: false,
          }
        })

        this.setSuccessMessage('Rep Log Saved!')
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
    deleteRepLog(id)
    this.setState(oldState => ({
      repLogs: oldState.repLogs.filter(repLog => repLog.id !== id)
    }))
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
  withHeart: PropTypes.bool
}
