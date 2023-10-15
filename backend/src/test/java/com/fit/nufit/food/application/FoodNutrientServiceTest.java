package com.fit.nufit.food.application;

import com.fit.nufit.food.domain.FoodNutrientRepository;
import com.fit.nufit.food.dto.request.FoodCreateRequest;
import com.fit.nufit.food.dto.request.FoodNutrientCreateRequest;
import com.fit.nufit.food.dto.request.FoodNutrientUpdateRequest;
import com.fit.nufit.food.dto.response.CreatedFoodResponse;
import com.fit.nufit.member.domain.Member;
import com.fit.nufit.member.domain.MemberRepository;
import com.fit.nufit.member.domain.Role;
import com.fit.nufit.nutrient.domain.Nutrient;
import com.fit.nufit.nutrient.domain.NutrientRepository;
import com.fit.nufit.nutrient.domain.NutrientUnit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class FoodNutrientServiceTest {

    @Autowired
    FoodService foodService;

    @Autowired
    FoodNutrientService foodNutrientService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    FoodNutrientRepository foodNutrientRepository;

    @Autowired
    NutrientRepository nutrientRepository;

    @BeforeEach
    void beforeEach() {
        Nutrient carb = nutrientRepository.save(new Nutrient("탄수화물", NutrientUnit.G));
        nutrientRepository.save(new Nutrient("지방", NutrientUnit.G));
        nutrientRepository.save(new Nutrient("단백질", NutrientUnit.G));
        nutrientRepository.save(new Nutrient("당", NutrientUnit.G, carb));
    }


    @Test
    @Transactional
    void 음식의_영양소를_수정한다() {
        // given
        Member member = new Member("이근우", "geunwoo.dev@gmail.com", "1", Role.USER);
        memberRepository.save(member);

        FoodNutrientCreateRequest carb = new FoodNutrientCreateRequest("탄수화물", 10);
        FoodNutrientCreateRequest fat = new FoodNutrientCreateRequest("지방", 5);
        FoodCreateRequest foodCreateRequest = new FoodCreateRequest(member.getId(), "파스타", "오뚜기",
                1, "g", "brand", 500, List.of(carb, fat));
        CreatedFoodResponse createdFoodResponse = foodService.save(foodCreateRequest);
        Long foodId = createdFoodResponse.getId();
        FoodNutrientCreateRequest protein = new FoodNutrientCreateRequest("단백질", 5);
        FoodNutrientUpdateRequest request = new FoodNutrientUpdateRequest(foodId, List.of(protein));
        // when
        foodNutrientService.update(request);

        // then
        assertThat(foodNutrientRepository.getByFoodId(foodId).size()).isEqualTo(1);
        assertThat(foodNutrientRepository.getByFoodId(foodId).get(0).getNutrient().getName())
                .isEqualTo("단백질");

    }
}
