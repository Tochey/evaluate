import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {
    @Test
    public void testAdd1() {
        Solution solution = new Solution();
        int[] testArray = {};
        double expected = 0.0;
        double actual = solution.average(testArray);
        assertEquals(expected, actual, 0.001);
    }
    @Test
    public void testAdd2() {
        Solution solution = new Solution();
        int[] testArray = {-1, -2, -3, -4, -5};
        double expected = -3.0;
        double actual = solution.average(testArray);
        assertEquals(expected, actual, 0.001);
    }
    @Test
    public void testAdd3() {
        Solution solution = new Solution();
        int[] testArray = {Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE};
        double expected = (double) Integer.MAX_VALUE;
        double actual = solution.average(testArray);
        assertEquals(expected, actual, 0.001);
    }
    @Test
    public void testAdd4() {
        Solution solution = new Solution();
        int[] testArray = {Integer.MIN_VALUE, Integer.MIN_VALUE, Integer.MIN_VALUE};
        double expected = (double) Integer.MIN_VALUE;
        double actual = solution.average(testArray);
        assertEquals(expected, actual, 0.001);
    }
  
}