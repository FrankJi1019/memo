import React from "react";

class MemoEditor extends React.Component {

    state = {
        title: '',
        content: ''
    }

    changeTitle = e => {
        this.setState({
            title: e.target.value
        })
    }

    changeContent = e => {
        this.setState({
            content: e.target.value
        })
    }

    createMemo = () => {
        if (this.state.title.trim() === '' || this.state.content.trim() === '') {
            return
        }
        const memo = {
            title: this.state.title,
            content: this.state.content,
            date: new Date(),
            username: this.props.username
        }
        // this.props.addNewMemo(memo)
        fetch(`http://localhost:9000/memo`, {
            method: 'POST',
            body: JSON.stringify(memo)
        }).then(res => {
            res = res.json()
            return res
        }).then(res => {
            const memos = res.memos
            memos.forEach(memo => {
                memo.date = new Date(memo.date)
            })
            this.props.setMemos(memos)
        })
    }

    render() {
        return (
            <div className="memo-editor fr">
                <input value={this.state.title} onChange={this.changeTitle} type="text" className="title" placeholder="Title" />
                <br />
                <textarea value={this.state.content} onChange={this.changeContent} className="content" placeholder="Content" />
                <br />
                <div className="submit btn" onClick={this.createMemo}>Create</div>
                <div className="cancel btn" onClick={this.props.cancelAddingMemo}>Cancel</div>
            </div>
        )
    }

}

export default MemoEditor