package com.fit.nufit.food.presentation;

import com.fit.nufit.common.ControllerTest;
import com.fit.nufit.food.domain.Food;
import com.fit.nufit.food.domain.FoodType;
import com.fit.nufit.food.domain.FoodUnit;
import com.fit.nufit.food.dto.request.FoodCreateRequest;
import com.fit.nufit.food.dto.request.FoodNutrientCreateRequest;
import com.fit.nufit.food.dto.request.FoodNutrientUpdateRequest;
import com.fit.nufit.food.dto.response.CreatedFoodResponse;
import com.fit.nufit.food.dto.response.FoodResponse;
import com.fit.nufit.food.dto.response.NutrientDetailResponse;
import com.fit.nufit.food.dto.response.SearchFoodResponse;
import com.fit.nufit.nutrient.domain.Nutrient;
import com.fit.nufit.nutrient.domain.NutrientRepository;
import com.fit.nufit.nutrient.domain.NutrientUnit;
import com.fit.nufit.nutrient.dto.response.NutrientResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FoodController.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class FoodControllerTest extends ControllerTest {

    @Autowired
    NutrientRepository nutrientRepository;

    @Test
    void 음식을_조회한다() throws Exception {
        // given
        Long foodId = 1L;
        Food pasta = new Food("파스타", 1, FoodUnit.G, "오뚜기", FoodType.BRAND, 500);
        Nutrient tan = new Nutrient("탄수화물", NutrientUnit.from("g"));
        Nutrient tan1 = new Nutrient("탄수화물1", NutrientUnit.from("g"));
        Nutrient dan = new Nutrient("단백질", NutrientUnit.from("g"));
        NutrientResponse nutrientResponse = new NutrientResponse(tan, 100);
        nutrientResponse.addChildNutrientResponses(new NutrientResponse(tan1, 100));
        given(foodService.getFoodById(any()))
                .willReturn(new FoodResponse(pasta,
                                List.of(nutrientResponse, new NutrientResponse(dan, 20)
                                )
                        )
                );

        // when & then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/foods/{foodId}", foodId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/read",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("foodId").description("음식 ID")
                        ),
                        responseFields(
                                fieldWithPath("id").description("음식 ID"),
                                fieldWithPath("name").description("음식 Name"),
                                fieldWithPath("brand").description("음식 Brand"),
                                fieldWithPath("amount").description("음식 Amount"),
                                fieldWithPath("unit").description("음식 Unit"),
                                fieldWithPath("type").description("음식 Type(normal or brand)"),
                                fieldWithPath("calorie").description("음식 Calorie"),
                                subsectionWithPath("nutrientResponses[]").description("영양소 정보"),
                                fieldWithPath("nutrientResponses[].id").description("영양소 ID"),
                                fieldWithPath("nutrientResponses[].name").description("영양소 이름"),
                                fieldWithPath("nutrientResponses[].amount").description("영양소 양"),
                                fieldWithPath("nutrientResponses[].unit").description("영양소 단위"),
                                subsectionWithPath("nutrientResponses[].childNutrientResponses[]").description("하위 영양소 정보"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].id").description("하위 영양소 ID"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].name").description("하위 영양소 이름"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].amount").description("하위 영양소 양"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].unit").description("하위 영양소 단위"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].childNutrientResponses").description("하위의 하위 영양소 정보")
                        )));
    }

    @Test
    void 새로운_음식을_등록한다() throws Exception {
        // given
        FoodCreateRequest request = new FoodCreateRequest(
                1L, "파스타", "오뚜기", 1, "g", "brand", 500,
                new ArrayList<>(
                        List.of(new FoodNutrientCreateRequest("탄수화물", 10),
                                new FoodNutrientCreateRequest("단백질", 10),
                                new FoodNutrientCreateRequest("지방", 10)
                        )
                )
        );
        given(foodService.save(any(FoodCreateRequest.class)))
                .willReturn(new CreatedFoodResponse(1L, "파스타", "오뚜기", 1, FoodType.BRAND, FoodUnit.G, 500));

        // when & then
        mockMvc.perform(post("/api/foods")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .with(csrf())
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/create",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("memberId").description("Member ID"),
                                fieldWithPath("name").description("Food Name"),
                                fieldWithPath("brand").description("Food Brand"),
                                fieldWithPath("amount").description("Food Amount"),
                                fieldWithPath("unit").description("Food Unit"),
                                fieldWithPath("type").description("Food Type(normal or brand)"),
                                fieldWithPath("calorie").description("Food Calorie"),
                                subsectionWithPath("nutrients").description("Food Nutrients Array"),
                                fieldWithPath("name").description("Nutrient name"),
                                fieldWithPath("amount").description("Nutrient amount")
                        ),
                        responseFields(
                                fieldWithPath("id").description("Food ID"),
                                fieldWithPath("name").description("Food Name"),
                                fieldWithPath("brand").description("Food Brand"),
                                fieldWithPath("amount").description("Food Amount"),
                                fieldWithPath("unit").description("Food Unit"),
                                fieldWithPath("type").description("Food Type"),
                                fieldWithPath("calorie").description("Food Calorie")
                        )));
    }

    @Test
    void 등록한_음식을_조회한다() throws Exception {
        // given
        Long memberId = 1L;
        given(foodService.getFoodsByMemberId(any()))
                .willReturn(List.of(new CreatedFoodResponse(1L, "커피", "NORMAL", 1, FoodType.NORMAL, FoodUnit.G, 500),
                        new CreatedFoodResponse(2L, "만두", "오뚜기", 1, FoodType.BRAND, FoodUnit.G, 500)));

        // when & then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/foods/member/{memberId}", memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/member-food",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("memberId").description("멤버 ID")
                        ),
                        responseFields(
                                subsectionWithPath("[]").description("멤버가 등록한 음식 목록"),
                                fieldWithPath("[].id").description("음식 ID"),
                                fieldWithPath("[].name").description("음식 이름"),
                                fieldWithPath("[].brand").description("음식 브랜드"),
                                fieldWithPath("[].amount").description("음식 양"),
                                fieldWithPath("[].type").description("음식 유형"),
                                fieldWithPath("[].calorie").description("음식 칼로리")
                        )));
    }

    @Test
    void 식사에_있는_음식을_조회한다() throws Exception {
        // given
        Long mealDetailId = 1L;
        Nutrient tan = new Nutrient("탄수화물", NutrientUnit.from("g"));
        Nutrient tan1 = new Nutrient("탄수화물1", NutrientUnit.from("g"));
        Nutrient dan = new Nutrient("단백질", NutrientUnit.from("g"));
        NutrientResponse nutrientResponse = new NutrientResponse(tan, 100);
        nutrientResponse.addChildNutrientResponses(new NutrientResponse(tan1, 100));
        given(foodService.getNutrientDetailByMealDetailId(any()))
                .willReturn(new NutrientDetailResponse("파스타", 2, 500,
                        List.of(nutrientResponse, new NutrientResponse(dan, 20))));
        // when & then
        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/foods/details/{mealDetailId}/nutrients", mealDetailId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/nutrient-detail",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("mealDetailId").description("식사상세 ID(식사에 있는 음식 개수가 포함된 음식 ID)")),
                        responseFields(
                                fieldWithPath("foodName").description("음식 이름"),
                                fieldWithPath("foodCount").description("음식 개수"),
                                fieldWithPath("calorieTotal").description("총 칼로리"),
                                subsectionWithPath("nutrientResponses[]").description("영양소 정보"),
                                fieldWithPath("nutrientResponses[].id").description("영양소 ID"),
                                fieldWithPath("nutrientResponses[].name").description("영양소 이름"),
                                fieldWithPath("nutrientResponses[].amount").description("영양소 양"),
                                fieldWithPath("nutrientResponses[].unit").description("영양소 단위"),
                                subsectionWithPath("nutrientResponses[].childNutrientResponses[]").description("하위 영양소 정보"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].id").description("하위 영양소 ID"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].name").description("하위 영양소 이름"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].amount").description("하위 영양소 양"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].unit").description("하위 영양소 단위"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].childNutrientResponses").description("하위의 하위 영양소 정보")
                        )));
    }

    @Test
    void 검색_단어를_기준으로_자동완성_기능을_제공한다() throws Exception {
        // given
        given(foodService.getFoodNamesBySearchWord(any()))
                .willReturn(new ArrayList<>(List.of(
                        new SearchFoodResponse(1L, "커피"),
                        new SearchFoodResponse(2L, "커피콩"))));

        // when & then
        mockMvc.perform(get("/api/foods/names")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .queryParam("q", "커피")
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/auto-complete",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("q").description("자동완성 검색어(q=커피)")),
                        responseFields(
                                subsectionWithPath("[]").description("자동완성 검색결과"),
                                fieldWithPath("[].id").description("검색된 음식 ID"),
                                fieldWithPath("[].name").description("검색된 음식 이름")
                        )));

    }

    @Test
    void 검색_단어를_기준으로_관련된_음식을_조회하는_기능을_제공한다() throws Exception {
        // given
        given(foodService.getFoodsByName(any(), anyInt()))
                .willReturn(List.of(
                        new CreatedFoodResponse(1L, "커피", "오뚜기", 1, FoodType.BRAND, FoodUnit.G, 500),
                        new CreatedFoodResponse(2L, "커피콩", "오뚜기", 1, FoodType.BRAND, FoodUnit.G, 500)));

        // when & then
        mockMvc.perform(get("/api/foods/search")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .queryParam("q", "커피")
                        .queryParam("page", "0")
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/auto-complete/search",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("q").description("검색어(q=커피)"),
                                parameterWithName("page").description("검색 페이지")
                        ),
                        responseFields(
                                fieldWithPath("[]").description("검색 결과 음식 목록"),
                                fieldWithPath("[].id").description("음식 ID"),
                                fieldWithPath("[].name").description("음식 이름"),
                                fieldWithPath("[].brand").description("음식 브랜드"),
                                fieldWithPath("[].amount").description("음식 양"),
                                fieldWithPath("[].type").description("음식 유형"),
                                fieldWithPath("[].unit").description("음식 단위"),
                                fieldWithPath("[].calorie").description("음식 칼로리")
                        )));
    }

    @Test
    void 등록한_음식의_영양소를_수정한다() throws Exception {
        // given
        Long foodId = 1L;
        FoodNutrientUpdateRequest request = new FoodNutrientUpdateRequest(1L, List.of(
                new FoodNutrientCreateRequest("탄수화물", 10),
                new FoodNutrientCreateRequest("단백질", 5)
        ));
        Nutrient tan = new Nutrient("탄수화물", NutrientUnit.from("g"));
        Nutrient tan1 = new Nutrient("탄수화물1", NutrientUnit.from("g"));
        Nutrient dan = new Nutrient("단백질", NutrientUnit.from("g"));
        NutrientResponse tanResponse = new NutrientResponse(tan, 10);
        tanResponse.addChildNutrientResponses(new NutrientResponse(tan1, 10));
        given(foodNutrientService.update(any(FoodNutrientUpdateRequest.class)))
                .willReturn(new NutrientDetailResponse("파스타", 1, 500,
                                List.of(
                                        tanResponse,
                                        new NutrientResponse(dan, 5))
                        )
                );
        // when & then
        mockMvc.perform(RestDocumentationRequestBuilders.put("/api/foods/{foodId}/nutrients", foodId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .with(csrf())
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("/food/update-food",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("foodId").description("영양소를 수정할 음식 ID")
                        ),
                        requestParameters(
                                parameterWithName("_csrf").ignored()
                        ),
                        requestFields(
                                fieldWithPath("foodId").description("영양소를 수정할 음식 ID"),
                                subsectionWithPath("nutrients[]").description("수정할 영양소 목록"),
                                fieldWithPath("nutrients[].name").description("영양소 이름"),
                                fieldWithPath("nutrients[].amount").description("영양소 양")
                        ),
                        responseFields(
                                fieldWithPath("foodName").description("음식 이름"),
                                fieldWithPath("foodCount").description("음식 개수"),
                                fieldWithPath("calorieTotal").description("총 칼로리"),
                                subsectionWithPath("nutrientResponses[]").description("영양소 정보"),
                                fieldWithPath("nutrientResponses[].id").description("영양소 ID"),
                                fieldWithPath("nutrientResponses[].name").description("영양소 이름"),
                                fieldWithPath("nutrientResponses[].amount").description("영양소 양"),
                                fieldWithPath("nutrientResponses[].unit").description("영양소 단위"),
                                subsectionWithPath("nutrientResponses[].childNutrientResponses[]").description("하위 영양소 정보"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].id").description("하위 영양소 ID"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].name").description("하위 영양소 이름"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].amount").description("하위 영양소 양"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].unit").description("하위 영양소 단위"),
                                fieldWithPath("nutrientResponses[].childNutrientResponses[].childNutrientResponses").description("하위의 하위 영양소 정보")
                        )));
    }


    @Test
    void 등록한_음식을_삭제한다() throws Exception {
        // given
        Long foodId = 1L;
        willDoNothing().given(foodService).deleteFoodAndFoodNutrientsById(any());

        // when & then
        mockMvc.perform(RestDocumentationRequestBuilders.delete("/api/foods/{foodId}", foodId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login())
                )
                .andDo(print())
                .andExpect(status().isNoContent())
                .andDo(document("/food/delete",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("foodId").description("삭제할 음식 ID")
                        ),
                        requestParameters(
                                parameterWithName("_csrf").ignored()
                        )));
    }
}
