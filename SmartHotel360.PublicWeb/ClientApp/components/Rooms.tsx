﻿import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as RoomsStore from '../store/Rooms';

type RoomsProps =
    RoomsStore.RoomsState
    & typeof RoomsStore.actionCreators;

// TODO: remove any
class Rooms extends React.Component<any, {}> {
    public componentDidMount() {
        this.props.request();
    }
    

    public render() {
        
        return <div className='sh-rooms'>
            <span className='sh-rooms-title'>{this.props.title}</span>
            {this.props.isLoading
                ? <div> Loading... </div>
                :
                this.props.list.map((room: any, key: any) =>
                    <div className='sh-rooms-item' key={key}>
                        {React.createElement(this.props.component, Object.assign({}, this.props, {...room }))}
                    </div>
                )
            }
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.rooms, // Selects which state properties are merged into the component's props
    RoomsStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Rooms) as typeof Rooms;