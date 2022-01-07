import React from "react";
import Header from "./Header";
import Memo from "./Memo";
import MemoEditor from "./MemoEditor";

class Main extends React.Component {

    state = {
        memos: [],
        viewMemoId: -1,
        adding: false
    }

    showMemoEditor = () => {
        this.setState({
            adding: true
        })
    }

    viewContent = id => {
        this.setState({
            viewMemoId: this.state.viewMemoId === id ? -1 : id
        })
    }

    setMemos = memos => {
        this.setState({
            memos,
            adding: false
        })
    }

    cancelAddingMemo = () => {
        this.setState({
            adding: false
        })
    }

    fetchMemo = () => {
        fetch(`http://localhost:9000/memo/${this.props.username}`, {
            method: 'GET',
        }).then(res => {
            res = res.json()
            return res
        }).then(res => {
            const memos = res.memos
            memos.forEach(memo => {
                memo.date = new Date(memo.date)
            })
            this.setState({
                memos
            })
        })
    }

    render() {
        return (
            <div className="Main">
                <Header username={this.props.username} />
                <div className="main-section ov">
                    <div className={this.state.adding ? "memos memos-when-adding" : "memos"}>
                        {
                            this.state.memos.map(memo => (
                                <Memo key={memo._id} memo={memo} viewContent={this.viewContent} showContent={memo._id === this.state.viewMemoId} 
                                    update={this.fetchMemo} />
                            ))
                        }
                    </div>
                    {this.state.memos.length===0 && !this.state.adding ? <div className="no-memo">There is no memo yet</div> : null}
                    {this.state.adding ? <MemoEditor setMemos={this.setMemos} cancelAddingMemo={this.cancelAddingMemo} username={this.props.username} /> : null}
                </div>
                {this.state.adding ? null : <div className="add-new" onClick={this.showMemoEditor}>+</div>}
            </div>
        )
    }

    componentDidMount() {
        this.fetchMemo()
    }

}

export default Main
