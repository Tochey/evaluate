import org.junit.Test;
import static org.junit.Assert.*;
  
public class SolutionTest {
    @Test
  public void test1() {
    Solution solution = new Solution();
    int result = solution.addNumber(3, 3);

    assertEquals(6, result);
  }
  @Test
  public void test2() {
    Solution solution = new Solution();
    int result = solution.addNumber(3, 10);

    assertEquals(13, result);
  }

  @Test
  public void test3() {
    Solution solution = new Solution();
    int result = solution.addNumber(9, 9);

    assertEquals(18, result);
  }

  @Test
  public void test4() {
    Solution solution = new Solution();
    int result = solution.addNumber(100, 100);

    assertEquals(200, result);
  }
}