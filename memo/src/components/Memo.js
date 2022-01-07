import React from "react";

class Memo extends React.Component {

    formateDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    viewThisContent = () => {
        this.props.viewContent(this.props.memo._id)
    }

    deleteMemo = e => {
        e.stopPropagation()
        fetch('http://localhost:9000/memo', {
            method: 'DELETE',
            body: JSON.stringify({
                id: this.props.memo._id
            })
        }).then(() => {
            this.props.update()
        })
    }

    render() {
        return (
            <div className="single-memo ov" onClick={this.viewThisContent}>
                <div className="ov">
                    <div className="memo-title fl">{this.props.memo.title}</div>
                    <div className="memo-date fr">
                        {this.formateDate(this.props.memo.date)}
                    </div>
                </div>
                {
                    this.props.showContent ? (<div className="memo-content">{this.props.memo.content}</div>) : null
                }
                <div className="delete" onClick={this.deleteMemo}>x</div>
            </div>
        )
    }
    
}

export default Memo