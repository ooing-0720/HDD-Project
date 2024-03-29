package com.HDD.management.security;


import com.HDD.management.model.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@ToString
public class MemberDetails implements UserDetails {

    // 직렬화, 역직렬화 가능
    private static final long serialVersionUID = 1L;

    private String sid;
    private String email;
//    private boolean emailVerified;  // 이메일 인증 여부
    private String password;
    private String nickname;

    // 권한 목록
    private Collection<GrantedAuthority> authorities;

    public MemberDetails(String sid, String email, String password, String nickname, Collection<GrantedAuthority> authorities) {
        this.sid = sid;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.authorities = authorities;
    }

    public static MemberDetails build(Member member) {

        List<GrantedAuthority> authorities = member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());


        return new MemberDetails(
                member.getSid(),
                member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return sid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getNickname() {
        return nickname;
    }
}
