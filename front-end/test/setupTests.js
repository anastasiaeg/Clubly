// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

var localStorageMock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();
global.localStorage = localStorageMock
localStorage.setItem('user', JSON.stringify({
    oid: 16573,
    firstName: "Anastasia",
    lastName: "Egorova",
    year: "SR",
    studentId: "200120353",
    major: "CSC",
    memberOf: [16579, 16554],
    organizerOf: [16554],
    email: "a@ncsu.edu",
    password: "$2b$08$oA4YkX.X5DtQ8c12g7CtJOM3z2.NQnzkXl1iPuBAqlBATp3CULEKG",
    tag: ["Technology", "Books"]
}));;
