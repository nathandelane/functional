;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname racket_learning) (read-case-sensitive #t) (teachpacks ((lib "convert.rkt" "teachpack" "htdp"))) (htdp-settings #(#t constructor repeating-decimal #f #t none #f ((lib "convert.rkt" "teachpack" "htdp")) #f)))
(define (Fahrenheit->Celsius f)
  (* (/ 9 5)
    (- f 32)))

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