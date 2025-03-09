package com.simpledpgfapi.configuration.database;

import com.simpledpgfapi.dpgf.model.dpgf.Dpgf;
import com.simpledpgfapi.dpgf.model.lot.Lot;
import com.simpledpgfapi.dpgf.model.product.Product;
import com.simpledpgfapi.user.model.invitation.Invitation;
import com.simpledpgfapi.user.model.organization.Organization;
import com.simpledpgfapi.user.model.refreshtoken.RefreshToken;
import com.simpledpgfapi.user.model.user.User;
import com.simpledpgfapi.user.model.validation.AccountValidationCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.Optional;

@Configuration
@EnableMongoAuditing
public class MongoConfiguration {
    @Autowired
    private MongoTemplate mongoTemplate;

    // AuditorAware to get isCreatedBy and isModifiedBy
    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Principal::getName);
    }

    public void initIndex() {
        // accountValidationCode
        mongoTemplate.indexOps(AccountValidationCode.class).ensureIndex(new Index().unique()
                .on(AccountValidationCode.CODE, Sort.Direction.ASC));

        // invitation
        mongoTemplate.indexOps(Invitation.class).ensureIndex(new Index().unique()
                .on(Invitation.INVIT_TOKEN, Sort.Direction.ASC));
        mongoTemplate.indexOps(Invitation.class).ensureIndex(new Index()
                .on(Invitation.ORGANIZATION_ID, Sort.Direction.ASC));
        mongoTemplate.indexOps(Invitation.class).ensureIndex(new Index().unique()
                .on(Invitation.EMAIL_RECEIVER, Sort.Direction.ASC));

        // refresToken
        mongoTemplate.indexOps(RefreshToken.class).ensureIndex(new Index()
                .on(RefreshToken.USER_ID, Sort.Direction.ASC));

        // organization
        mongoTemplate.indexOps(Organization.class).ensureIndex(new Index().unique()
                .on(Organization.NAME, Sort.Direction.ASC));
        mongoTemplate.indexOps(Organization.class).ensureIndex(new Index()
                .on(Organization.ORGANIZATION_STATUS, Sort.Direction.ASC)
                .on(Organization.ORGANIZATION_TYPE,Sort.Direction.ASC ));
        mongoTemplate.indexOps(Organization.class).ensureIndex(new Index().unique()
                .on(Organization.ORGANIZATION_ID, Sort.Direction.ASC)
                .on(Organization.USER_LICENSE_COUNTER, Sort.Direction.ASC));
        mongoTemplate.indexOps(Organization.class).ensureIndex(new Index().unique()
                .on(Organization.ORGANIZATION_ID, Sort.Direction.ASC)
                .on(Organization.PROJECT_LICENSE_COUNTER, Sort.Direction.ASC));



        // user
        mongoTemplate.indexOps(User.class).ensureIndex(new Index().unique()
                .on(User.EMAIL, Sort.Direction.ASC));
        mongoTemplate.indexOps(User.class).ensureIndex(new Index()
                .on(User.ORGANIZATION_ID, Sort.Direction.ASC));

        // dpgf
        mongoTemplate.indexOps(Dpgf.class).ensureIndex(new Index()
                .on(Dpgf.USER_ID, Sort.Direction.ASC));
        mongoTemplate.indexOps(Dpgf.class).ensureIndex(new Index()
                .on(Dpgf.USER_ID, Sort.Direction.ASC)
                .on(Dpgf.DPGF_STATUS, Sort.Direction.ASC));
        mongoTemplate.indexOps(Dpgf.class).ensureIndex(new Index()
                        .on(Dpgf.ORGANIZATION_ID, Sort.Direction.ASC));
        mongoTemplate.indexOps(Dpgf.class).ensureIndex(new Index()
                .on(Dpgf.ORGANIZATION_ID, Sort.Direction.ASC)
                .on(Dpgf.DPGF_STATUS, Sort.Direction.ASC));

        // lots
        mongoTemplate.indexOps(Lot.class).ensureIndex(new Index()
                .on(Lot.DPGF_ID, Sort.Direction.ASC));
        mongoTemplate.indexOps(Lot.class).ensureIndex(new Index()
                .on(Lot.DPGF_ID, Sort.Direction.ASC)
                .on(Lot.LOT_NAME, Sort.Direction.ASC));

        // products
        mongoTemplate.indexOps(Product.class).ensureIndex(new Index()
                .on(Product.DPGF_ID, Sort.Direction.ASC));
        mongoTemplate.indexOps(Lot.class).ensureIndex(new Index()
                .on(Product.LOT_ID, Sort.Direction.ASC));
    }
}
