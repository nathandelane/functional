import static functional.Functional.compareAndReturn;
import static functional.Functional.compare;

public class Main {

  private Main() {
  }

  public static void main(final String[] args) {
    final String name = "Nathan Lane";
    final Integer age = compareAndReturn(compare(name, "Nathan Lane"), 36, 0);

    System.out.println(name + ": " + age);
  }

}
