package com.HDD.management.token;

import lombok.Getter;

import java.util.List;

@Getter
public class JwtResponse {
    private String token;
    private String sid;
    private String email;
    private String nickname;
    private List<String> roles;

    public JwtResponse(String token, String sid, String email, String nickname, List<String> roles) {
        this.token = token;
        this.sid = sid;
        this.email = email;
        this.nickname = nickname;
        this.roles = roles;
    }
}
