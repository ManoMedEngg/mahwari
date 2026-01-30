import datetime
from datetime import date, timedelta
from typing import List, Optional, Dict, Tuple
import statistics

class CycleAnalyzer:
    def __init__(self, cycles: List[date]):
        """
        Initialize with a list of period start dates.
        Dates should be sorted in ascending order.
        """
        self.cycles = sorted(cycles)
        self.avg_cycle_length = 28
        self.is_pcos = False
        
        if len(self.cycles) >= 2:
            self._analyze_history()

    def _analyze_history(self):
        """Calculate average cycle length and check for PCOS indicators."""
        cycle_lengths = []
        for i in range(len(self.cycles) - 1):
            length = (self.cycles[i+1] - self.cycles[i]).days
            cycle_lengths.append(length)
        
        if cycle_lengths:
            self.avg_cycle_length = int(statistics.mean(cycle_lengths))
            variance = statistics.stdev(cycle_lengths) if len(cycle_lengths) > 1 else 0
            
            # PCOS Logic: Variance > 7 days OR Average > 35 days
            if variance > 7 or self.avg_cycle_length > 35:
                self.is_pcos = True

    def predict_next_period(self, last_period_date: date) -> date:
        """Predict the next period start date."""
        return last_period_date + timedelta(days=self.avg_cycle_length)

    def get_phase(self, current_date: date, last_period_date: date) -> Tuple[str, str]:
        """
        Determine the current cycle phase and fertility status.
        Returns: (Phase Name, Fertility Status)
        """
        cycle_day = (current_date - last_period_date).days + 1
        next_period = self.predict_next_period(last_period_date)
        days_until_next = (next_period - current_date).days
        
        # Ovulation is typically 14 days before the next period
        ovulation_day = self.avg_cycle_length - 14
        
        if cycle_day < 1:
            return "Unknown", "Unknown"
        
        # Menstrual Phase: Days 1-5 (Approx)
        if 1 <= cycle_day <= 5:
            return "Menstrual", "Low"
            
        # Follicular Phase: Days 6-13
        # Strict requirement: Days 6-13
        if 6 <= cycle_day <= 13:
            # Check if we are close to ovulation (overlap possible)
            if abs(cycle_day - ovulation_day) <= 2:
                 return "Follicular", "High"
            return "Follicular", "Medium"

        # Ovulation Calculation
        # Fertility Window: High during Ovulation +/- 2 days
        if abs(cycle_day - ovulation_day) <= 2:
            return "Ovulation", "High"

        # Luteal Phase: After Ovulation until next period
        if cycle_day > ovulation_day + 2:
            return "Luteal", "Low"
            
        return "Follicular", "Medium" # Fallback

    def get_cycle_stats(self) -> Dict:
        return {
            "avg_length": self.avg_cycle_length,
            "is_pcos": self.is_pcos
        }
