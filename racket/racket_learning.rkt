;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname racket_learning) (read-case-sensitive #t) (teachpacks ((lib "convert.rkt" "teachpack" "htdp"))) (htdp-settings #(#t constructor repeating-decimal #f #t none #f ((lib "convert.rkt" "teachpack" "htdp")) #f)))
(define (Fahrenheit->Celsius f)
  (* (/ 5 9)
    (- f 32)))

(define (Celsius->Fahrenheit c)
  (+
    (* c (/ 9 5))
    32))

(define (wages h)
  (* 12 h))

(define (tax w)
  (* 0.15 w))

(define (netpay h)
  (- (wages h)
     (tax (wages h))))

(define (profit ticket-price)
  (- (revenue ticket-price) (cost ticket-price)))

(define (revenue ticket-price)
  (* ticket-price (attendance ticket-price)))

(define (cost ticket-price)
  (+
    (* (attendance ticket-price) 0.04)
      180.00))

(define (attendance ticket-price)
  (+
    (* (/ 15 .10) (- 5.00 ticket-price))
      120))

(define (inches->cm inches)
  (* 2.54 inches))

(define (feet->inches feet)
  (* 12 feet))

(define (yards->feet yards)
  (* 3 yards))

(define (rods->yards rods)
  (* 5.5 rods))

(define (furlongs->rods furlongs)
  (* 40 furlongs))

(define (miles->furlongs miles)
  (* 8 miles))

(define (feet->cm feet)
  (inches->cm 
    (feet->inches feet)))

(define (yards->cm yards)
  (inches->cm 
    (feet->inches
      (yards->feet yards))))

(define (rods->inches rods)
  (feet->inches 
    (yards->feet 
      (rods->yards rods))))

(define (miles->feet miles)
  (yards->feet
    (rods->yards
      (furlongs->rods
        (miles->furlongs miles)))))

(define (area->circle radius)
  (* pi radius radius))

(define (volume->cylinder radius height)
  (* (area->circle radius) height))

(define (circumference radius)
  (* 2 pi radius))

(define (area->donut inner-radius outer-radius)
  (- (area->circle (max outer-radius inner-radius))
     (area->circle (min inner-radius outer-radius))))

(define (area->cylinder radius length)
  (* length
     (circumference radius)))

(define (area->pipe inner-radius length thickness)
  (+ 
    (area->cylinder inner-radius length)
    (area->cylinder (+ inner-radius thickness) length)
    (* 2
      (area->donut inner-radius (+ inner-radius thickness)))))

(define (speed-from-time g t)
  (* g t))

(define (height-from-speed v t)
  (* 0.5 v t))

(define (height g t)
  (height-from-speed (speed-from-time g t) t))

(define (eqn-1 x)
  (= 462
    (+ 2
       (* 4 (* x x))
       (* 6 x))))
       
     
(define (interest-rate dollars)
  (cond
    [(<= dollars 1000) 0.040]
    [(<= dollars 5000) 0.045]
    [else  0.05]))

(define (interest dollars)
  (* dollars (interest-rate dollars)))

(define (tax-rate w)
  (cond
    [(<= w 240) 0.00]
    [(<= w 480) 0.15]
    [else 0.28]))

(define (tax2 w)
  (* w (tax-rate w)))

(define (wages2 w)
  (* w 12))

(define (netpay2 w)
  (- (wages2 w) (tax2 (wages2 w))))