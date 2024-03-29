package com.HDD.map.service;

import com.HDD.management.model.Member;
import com.HDD.management.repository.MemberRepository;
import com.HDD.map.model.RestaurantLikes;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.RestaurantLikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantLikesService {
    private final RestaurantMarkerService restaurantMarkerService;
    private final RestaurantLikesRepository restaurantLikesRepository;

    public void addLike(Long markerId, Member member){

        RestaurantMarker restaurantMarker = restaurantMarkerService.findOne(markerId).get();

        if (!restaurantLikesRepository.existsByMemberAndRestaurantMarker(member, restaurantMarker))
        {
            restaurantMarker.setLikesCount(restaurantMarker.getLikesCount()+1);
            restaurantLikesRepository.save(new RestaurantLikes(restaurantMarker, member));
        }
        else {
            throw new IllegalStateException("이미 좋아요를 눌렀습니다.");
        }

    }

    public void addDislike(Long markerId, Member member){

        RestaurantMarker restaurantMarker = restaurantMarkerService.findOne(markerId).get();

        if (!restaurantLikesRepository.existsByMemberAndRestaurantMarker(member, restaurantMarker))
        {
            restaurantMarker.setDislikesCount(restaurantMarker.getDislikesCount()+1);
            restaurantLikesRepository.save(new RestaurantLikes(restaurantMarker, member));
        }
        else {
            throw new IllegalStateException("이미 싫어요를 눌렀습니다.");
        }

    }


}
