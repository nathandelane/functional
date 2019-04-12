package functional;

public final class Functional {

  public static <T> T compareAndReturn(final boolean condition, final T forTrue, final T forFalse) {
    return condition ? forTrue : forFalse;
  }

  public static <T> boolean compare(final T left, final T right) {
    return (left == right) || left.equals(right);
  }

}
