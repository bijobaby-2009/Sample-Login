import { showAlert } from '../../helper';
import { createUserTable, getLastUserData, getUserData, insertUserTable } from '../../service/user';
// import { createUserTable } from '../../service/user';

export default {
    state : {
        loading : false,
        error : null,
        users : [],
        user : {},
    },
    reducers : {
        onSaveData(state){
            return {
                ...state,
                loading : true,
            };
        },
        onGetUserList(state,data){
            return {
                ...state,
                loading: false,
                users :data || [],
            };
        },
        onGetUser(state,data){
            return {
                ...state,
                loading : false,
                user : data,
            };
        },

        getUser(state,data) {
            return {
                ...state,
                loading : false,
                user : data,
            };
        },
        onError(state,error){
            if (error){
                showAlert(error);
            }
            return {
                ...state,
                loading : false,
                error :error,
            };
        },

    },
    effects : {

        async getEmployees(){
            try {
                await getUserData( async result => {
                    console.log('result1',result);
                    if (result && result.length > 0){
                        this.onGetUserList(result);
                        console.log('result2',result);
                    }
                });
            }
            catch (e)
            {
                this.onError(e && e.message ? e.message : null);
            }
        },
        async setUserData(data){
            await createUserTable();
            try {
                console.log('data2',data);
              return await insertUserTable(data);
            //   let data2 = insertUserTable(data);
            //   console.log(data2);
            }
            catch (e)
            {
                this.onError( e && e.message ? e.message : null);
            }
        },
        async getLastUserDataInfo(){
            try {
                  return await getLastUserData(async result => {
                    //   if (result){
                    //       this.getUser(result);
                    //   }
                      return result;
                  });
            }
            catch (e)
            {
                this.onError(e && e.message ? e.message : null);
            }
        },

    },

};
