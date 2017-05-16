/**
 * @author Changheng Liou
 * @constructor 
 * @param {array} args - an array as an input of initial visitor, all objects
 * inside args must have both 'from' and 'to' property, to specify visitors'
 * time of stay. Because of very limited implementing time, please make sure
 * 'to' must larger than 'from'.
 * Input example: [{ from: 23, to: 34 }, { from: 18, to: 51 }]
 */
function visitor(args) {
    this.visitors;
    this.get_numOfVisitors = this.get_numOfVisitors.bind(this);
    this.reg_visitor = this.reg_visitor.bind(this);
    if (!args) {
        this.visitors = [];
    } else if (args.constructor !== Array) {
        throw new Error('Please given an array as correct input.')
    } else {
        this.visitors = args;
        this.visitors.sort(function(x, y) {
            return x.from - y.from;
        });
    }
}

/** Add a visitor to array, use binary search to find a best place to do insertion, complexity: big-oh(log(n)) */
/**
 * @param {integer} arrive - arrival time
 * @param {integer} departure - departure time
 * register a new visitor
 * please make sure arrival time is less lthan departure time
 */
visitor.prototype.reg_visitor = function(arrive, departure) {
    if (this.visitors.length === 0) {
        this.visitors[0] = { from: arrive, to: departure };
        return this.visitors;
    }
    var i = 0,
        left = 0,
        right = this.visitors.length - 1;
    for (i = parseInt((right - left) / 2); left != right && left < right;) {
        if (this.visitors[i].from < arrive) {
            left = i + 1;
        } else if (this.visitors[i].from > arrive) {
            right = i - 1;
        } else {
            break;
        }
        i = parseInt((right - left) / 2 + left);
    }

    if (this.visitors[i].from >= arrive) {
        var temp = this.visitors.slice(0, i);
        temp[i] = { from: arrive, to: departure };
        this.visitors = temp.concat(this.visitors.slice(i, this.visitors.length));
    } else if (this.visitors[i].from < arrive) {
        var temp = this.visitors.slice(0, i + 1);
        temp[i + 1] = { from: arrive, to: departure };
        this.visitors = temp.concat(this.visitors.slice(i + 1, this.visitors.length));
    }
    return this.visitors;
}

/** just doing linearly traversal, complexity = big-oh(n) */
/**
 * @param {integer} from - arrival time
 * @param {integer} to - departure time
 * @return {integer} - number of visitors in specified time
 * specify a duration and return the number of visitors in time 
 */
visitor.prototype.get_numOfVisitors = function(from, to) {
    var count = 0;
    for (var i = 0; i < this.visitors.length; i++) {
        if (this.visitors[i].from <= from) {
            if (this.visitors[i].to >= to) {
                console.log(this.visitors[i].from, this.visitors[i].to);
                count++;
            }
        } else {
            return count;
        }
    }
}

var s = new visitor([
    { from: 27, to: 45 },
    { from: 16, to: 23 },
    { from: 55, to: 64 },
    { from: 1, to: 47 },
    { from: 9, to: 18 },
    { from: 22, to: 29 },
    { from: 18, to: 44 },
    { from: 28, to: 52 },
    { from: 34, to: 47 },
    { from: 51, to: 64 },
    { from: 22, to: 49 },
    { from: 6, to: 31 },
]);
// s.reg_visitor(12, 34);
// s.reg_visitor(2, 45);
// s.reg_visitor(67, 71);
// s.reg_visitor(59, 64);
// s.reg_visitor(39, 45);
// s.reg_visitor(27, 42);
// s.reg_visitor(57, 68);
// s.reg_visitor(34, 49);
// s.reg_visitor(23, 31);
// s.reg_visitor(45, 52);
// s.reg_visitor(51, 55);
console.log(s.reg_visitor(63, 77));
console.log(s.get_numOfVisitors(55, 59));