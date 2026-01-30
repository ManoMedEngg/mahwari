import sys
import unittest
from datetime import date, timedelta
import os

# Add parent dir to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from logic import CycleAnalyzer

class TestCycleAnalyzer(unittest.TestCase):
    def test_phases(self):
        # Avg cycle 28 days
        # Last period: Jan 1
        # Ovulation: Jan 14 (Day 15 of cycle? No, 14 days before next. 28-14 = 14)
        # Cycle Day 14 -> Ovulation
        
        cycles = [date(2023, 1, 1), date(2023, 1, 29)] # 28 day cycle
        analyzer = CycleAnalyzer(cycles)
        
        # Day 1: Menstrual
        phase, _ = analyzer.get_phase(date(2023, 1, 29), date(2023, 1, 29))
        self.assertEqual(phase, "Menstrual")
        
        # Day 14: Ovulation (29 + 13 = Feb 11, wait. 
        # Last period Jan 29. Next period Feb 26 (28 days).
        # Ovulation = Feb 26 - 14 = Feb 12.
        # Check Feb 12.
        ovulation_date = date(2023, 2, 12) # Day 15 of cycle (Jan 29 is Day 1) -> 29,30,31,1,2,3...
        # Jan: 3 days. Feb: 12 days. Total 15 days.
        # Cycle Day = (Current - Last) + 1 = (Feb 12 - Jan 29) + 1 = 14 + 1 = 15.
        
        # Logic in code:
        # ovulation_day = 28 - 14 = 14.
        # abs(15 - 14) = 1 <= 2. Result: Ovulation.
        
        phase, _ = analyzer.get_phase(ovulation_date, date(2023, 1, 29))
        self.assertEqual(phase, "Ovulation")

    def test_pcos_detection(self):
        # Irregular cycles
        cycles = [
            date(2023, 1, 1),
            date(2023, 1, 20), # 19 days
            date(2023, 2, 28), # 39 days
            date(2023, 3, 15)  # 15 days
        ]
        analyzer = CycleAnalyzer(cycles)
        self.assertTrue(analyzer.is_pcos)

if __name__ == '__main__':
    unittest.main()
