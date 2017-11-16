class Point {
    
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    
      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    
    }
    
var point = new Point(2, 3);
point.__proto__.printName = function () { return 'Oops' };
console.log( Object.getPrototypeOf(point))