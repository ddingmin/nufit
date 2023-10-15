package com.fit.nufit.food.application;

import com.fit.nufit.food.domain.Food;
import com.fit.nufit.food.domain.FoodNutrientRepository;
import com.fit.nufit.food.domain.FoodRepository;
import com.fit.nufit.food.dto.request.FoodNutrientCreateRequest;
import com.fit.nufit.food.dto.request.FoodNutrientUpdateRequest;
import com.fit.nufit.food.dto.response.NutrientDetailResponse;
import com.fit.nufit.nutrient.dto.response.NutrientResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
@Service
public class FoodNutrientService {

    private final FoodNutrientRepository foodNutrientRepository;

    private final FoodRepository foodRepository;

    private final FoodService foodService;

    @Transactional
    public NutrientDetailResponse update(FoodNutrientUpdateRequest request) {
        Long foodId = request.getFoodId();
        foodNutrientRepository.deleteAllByFoodId(foodId);

        Food food = foodRepository.getById(foodId);
        List<FoodNutrientCreateRequest> nutrients = request.getNutrients();
        foodService.createFoodNutrients(food, nutrients);

        int calorie = (int) Math.round(food.getCalorie());
        List<NutrientResponse> nutrientResponses = foodService.getNutrientResponses(foodId, 1);
        return new NutrientDetailResponse(food.getName(), 1, calorie, nutrientResponses);
    }
}
