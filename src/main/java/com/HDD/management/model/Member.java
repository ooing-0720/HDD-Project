package com.HDD.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "members",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "sid"),
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "nickname")
})
public class Member {

    @Id
    @Pattern(regexp = "^[abcABC][0-9]{6}")
    private String sid;

    @Email
    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String nickname;

    @NotEmpty
    private String major;
    private String doubleMajor;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "member_roles",
            joinColumns = @JoinColumn(name = "user_sid"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    private int profile;

    public Member(String sid, String email, String password, String nickname, String major, String doubleMajor) {
        this.sid = sid;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.major = major;
        this.doubleMajor = doubleMajor;
        this.profile = 1;
    }
}
