package com.fit.nufit.food.dto.response;

import com.fit.nufit.food.domain.Food;
import com.fit.nufit.food.domain.FoodType;
import com.fit.nufit.food.domain.FoodUnit;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreatedFoodResponse {

    private Long id;
    private String name;
    private String brand;
    private int amount;
    private FoodType type;
    private FoodUnit unit;
    private int calorie;

    public CreatedFoodResponse(Food food) {
        this.id = food.getId();
        this.name = food.getName();
        this.brand = food.getBrand();
        this.amount = food.getAmount();
        this.type = food.getType();
        this.unit = food.getUnit();
        this.calorie = (int)Math.round(food.getCalorie());
    }
}
