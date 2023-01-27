import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {
    @Test
    public void testArraySum() {
        Solution solution = new Solution();
        int[][] testArray = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int expected = 45;
        int actual = solution.sumArray(testArray);
        assertEquals(expected, actual);
    }
    
    @Test
    public void testEmptyArray() {
        Solution solution = new Solution();
        int[][] testArray = {};
        int expected = 0;
        int actual = solution.sumArray(testArray);
        assertEquals(expected, actual);
    }

    @Test
    public void testSingleElementArray() {
        Solution solution = new Solution();
        int[][] testArray = {{1}};
        int expected = 1;
        int actual = solution.sumArray(testArray);
        assertEquals(expected, actual);
    }

    @Test
    public void testNegativeElements() {
        Solution solution = new Solution();
        int[][] testArray = {{-1, -2, -3}, {-4, -5, -6}, {-7, -8, -9}};
        int expected = -45;
        int actual = solution.sumArray(testArray);
        assertEquals(expected, actual);
    }
  
}