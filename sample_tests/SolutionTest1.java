import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {
    @Test
  public void test1() {
    Solution solution = new Solution();
    int[] arr = {1, 2, 3, 4, 5};
    int result = solution.addArray(arr);

    assertEquals(15, result);
  }

  @Test
  public void test2() {
    Solution solution = new Solution();
    int[] arr = {10, 10, 5};
    int result = solution.addArray(arr);

    assertEquals(25, result);
  }

  @Test
  public void test3() {
    Solution solution = new Solution();
    int[] arr = {};
    int result = solution.addArray(arr);

    assertEquals(0, result);
  }
}