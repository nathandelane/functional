def square(BigDecimal x) { x * x }

def average(def x, def y) { ((x + y) / 2) }

def abs(BigDecimal x) { Math.abs(x) }

def good_enough(BigDecimal guess, BigDecimal x) {
    abs(square(guess) - x) < 0.001
}

def improve(BigDecimal guess, BigDecimal x) { average(guess, (x / guess)) }

def sqrt_iter(BigDecimal guess, BigDecimal x) {
    if(good_enough(guess, x))
        guess
    else
        sqrt_iter(improve(guess, x), x)
}

def sqrt = { sqrt_iter(1.0, it) }

sqrt(9.0)