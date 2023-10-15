package com.fit.nufit.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fit.nufit.food.application.FoodNutrientService;
import com.fit.nufit.food.application.FoodService;
import com.fit.nufit.food.domain.FoodRepository;
import com.fit.nufit.meal.application.MealDetailService;
import com.fit.nufit.meal.application.MealService;
import com.fit.nufit.meal.domain.MealDetailRepository;
import com.fit.nufit.meal.domain.MealRepository;
import com.fit.nufit.meal.presentation.MealController;
import com.fit.nufit.member.presentation.MemberController;
import com.fit.nufit.member.service.MemberService;
import com.fit.nufit.nutrient.domain.NutrientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest({
        MealController.class,
        MemberController.class
})
public abstract class ControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected MealDetailRepository mealDetailRepository;

    @MockBean
    protected MealRepository mealRepository;

    @MockBean
    protected MealDetailService mealDetailService;

    @MockBean
    protected MealService mealService;

    @MockBean
    protected FoodService foodService;

    @MockBean
    protected MemberService memberService;

    @MockBean
    protected FoodNutrientService foodNutrientService;

    @MockBean
    protected FoodRepository foodRepository;

    @MockBean
    protected NutrientRepository nutrientRepository;
}
