package com.fit.nufit.meal.presentation;

import com.fit.nufit.meal.application.MealDetailService;
import com.fit.nufit.meal.application.MealService;
import com.fit.nufit.meal.dto.request.MealCreateRequest;
import com.fit.nufit.meal.dto.response.MealDetailsResponse;
import com.fit.nufit.meal.dto.response.MealResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/meals")
@RequiredArgsConstructor
@RestController
public class MealController {

    private final MealService mealService;
    private final MealDetailService mealDetailService;

    @PostMapping
    public ResponseEntity<MealResponse> save(@RequestParam Long memberId,
                                             @RequestBody MealCreateRequest request) {
        MealResponse response = mealService.save(memberId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{mealId}/details")
    public ResponseEntity<MealDetailsResponse> findAllByMealId(@PathVariable Long mealId) {
        MealDetailsResponse response = mealDetailService.findAllByMealId(mealId);
        return ResponseEntity.ok(response);
    }
}
