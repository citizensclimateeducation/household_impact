import React from 'react';

/**
 * Wrap dialog text in bootstrap dialog
 */
class InfoDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal" id={this.props.dialogId}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{this.props.title}</h3>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{this.props.children}</div>
            <div className="modal-footer">
              <button type="button btn btn-default" className="btn btn-secondary btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )

  }

}

export default InfoDialog;
