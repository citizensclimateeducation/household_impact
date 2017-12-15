import React from 'react';

class InfoDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal fade" id={this.props.dialogId}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 className="modal-title">{this.props.title}</h3>
            </div>
            <div className="modal-body">{this.props.children}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )

  }

}

export default InfoDialog;
