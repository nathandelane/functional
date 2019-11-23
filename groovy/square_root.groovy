def square(def x) { x * x }

def average(def x, def y) { ((x + y) / 2) }

def abs(def x) { Math.abs(x) }

def good_enough(def guess, def x) {
    abs(square(guess) - x) < 0.001
}

def improve(def guess, def x) { average(guess, (x / guess)) }

def sqrt_iter(def guess, def x) {
    if(good_enough(guess, x))
        guess
    else
        sqrt_iter(improve(guess, x), x)
}

def sqrt(def x) { sqrt_iter(1.0, x) }

sqrt(9.0)