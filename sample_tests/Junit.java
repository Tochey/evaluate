import org.junit.Test;
import static org.junit.Assert.*;

public class SolutionTest {
    @Test
    public void testAdd1() {
        Solution solution = new Solution();
        assertTrue(11, solution.addNumber(1, 10));
    }
    @Test
    public void testAdd2() {
        Solution solution = new Solution();
        assertTrue(solution.isEven(1, 2));
    }
    @Test
    public void testAdd3() {
        Solution solution = new Solution();
        assertTrue(!solution.isEven(1, 3));
    }
    @Test
    public void testAdd4() {
        Solution solution = new Solution();
        assertTrue(solution.isEven(-2, -4));
    }
    @Test
    public void testAdd5() {
        Solution solution = new Solution();
        assertTrue(!solution.isEven(-1, -3));
    }
}