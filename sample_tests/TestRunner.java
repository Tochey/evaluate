import org.junit.runner.JUnitCore;
import org.junit.runner.Result;

public class TestRunner {
    public static void main(String[] args) {
        Result result = JUnitCore.runClasses(SolutionTest.class);
        int runCount = result.getRunCount();
        int failureCount = result.getFailureCount();

        int passedCount = runCount - failureCount;
        double percentagePassed = (double) passedCount / runCount * 100;
        
        System.out.println("Percentage of test cases that passed: " + percentagePassed + "%");
    }
}