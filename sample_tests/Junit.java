import org.junit.Test;
import static org.junit.Assert.*;
public class SolutionTest {
    Solution solution = new Solution();
    @Test
  public void test1() {
    int[] array = {1, 2, 3, 4, 5};
    int target = 4;
    int expectedResult = 3;

    int result = solution.findNumber(array, target);
    assertEquals(expectedResult, result);
  }
  @Test
  public void test2() {
    int[] array = {1, 2, 3, 4, 5, 10, 19};
    int target = 10;
    int expectedResult = 5;

    int result = solution.findNumber(array, target);
    assertEquals(expectedResult, result);
  }
  @Test
  public void test3() {
    int[] array = {0};
    int target = 0;
    int expectedResult = 0;

    int result = solution.findNumber(array, target);
    assertEquals(expectedResult, result);
  }
  @Test
  public void test4() {
    int[] array = {0, 1, 89, 2, 1};
    int target = 89;
    int expectedResult = 2;

    int result = solution.findNumber(array, target);
    assertEquals(expectedResult, result);
  }
}