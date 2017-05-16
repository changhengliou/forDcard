import { Map, List, fromJS } from 'immutable';
const getTodoIndex = (id, todo) => {
    for (var i = 0; i < todo.size; i++) {
        if (todo.get(i).get('index') === id) {
            return i;
        }
    }
}

export const initState = {
    todo: [{
            index: 0,
            editable: false,
            msg: '0',
            hasFinished: false
        },
        {
            index: 1,
            editable: false,
            msg: '1',
            hasFinished: false
        },
        {
            index: 2,
            editable: false,
            msg: '2',
            hasFinished: false
        }, {
            index: 3,
            editable: false,
            msg: '3',
            hasFinished: false
        }
    ]
};
var count = initState.todo.length;
export const actionCreators = {
    onAddClick: () => (dispatch, getState) => {
        dispatch({ type: 'ADD_TODO' });
    },
    onDeleteClick: (id) => (dispatch, getState) => {
        dispatch({ type: 'DELETE_TODO', id: id });
    },
    onClearClick: () => (dispatch, getState) => {
        var todo = fromJS(getState()).get('todo');
        var data = fromJS(getState()).get('todo');
        for (var i = 0; i < todo.size; i++) {
            if (todo.get(i).get('hasFinished')) {
                todo = todo.delete(i);
                i--;
            }
        }
        dispatch({ type: 'CLEAR_TODO', payload: todo.toJS() });
    },
    onMsgClick: (id) => (dispatch, getState) => {
        dispatch({ type: 'SHOW_TODO_INPUT', id: id, payload: true });
    },
    onMsgConfirm: (id) => (dispatch, getState) => {
        dispatch({ type: 'DISABLE_TODO_INPUT', id: id, payload: false });
    },
    onMsgChange: (id, value) => (dispatch, getState) => {
        dispatch({ type: 'ON_TODO_MSG_CHANGED', id: id, payload: value });
    },
    onCheckChange: (id) => (dispatch, getState) => {
        var todo = fromJS(getState()).get('todo');
        var index = getTodoIndex(id, todo);
        var option = todo.get(index).get('hasFinished');
        dispatch({ type: 'ON_TODO_CHECK_CHANGE', id: id, payload: !option });
    },
};



export const reducer = (state = initState, action) => {
    var todo = fromJS(state).get('todo'); //list
    var id = getTodoIndex(action.id, todo);
    var data = todo.get(id); //map
    console.log(id);
    switch (action.type) {
        case 'ADD_TODO':
            var z = todo.push(Map({
                index: count++,
                editable: true,
                hasFinished: false,
                msg: ''
            })).toJS();
            return { todo: z };
        case 'DELETE_TODO':
            return { todo: todo.delete(id).toJS() };
        case 'CLEAR_TODO':
            return { todo: action.payload };
        case 'SHOW_TODO_INPUT':
        case 'DISABLE_TODO_INPUT':
            var z = todo.set(id, data.set('editable', action.payload)).toJS();
            return { todo: z };
        case 'ON_TODO_MSG_CHANGED':
            var z = todo.set(id, data.set('msg', action.payload)).toJS();
            return { todo: z };
        case 'ON_TODO_CHECK_CHANGE':
            var z = todo.set(id, data.set('hasFinished', action.payload)).toJS();
            return { todo: z };
        default:
            return state;
    }
};