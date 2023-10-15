package com.fit.nufit.food.dto.response;

import com.fit.nufit.nutrient.dto.response.NutrientResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NutrientDetailResponse {

    private String foodName;
    private int foodCount;
    private int calorieTotal;
    private List<NutrientResponse> nutrientResponses;

}
