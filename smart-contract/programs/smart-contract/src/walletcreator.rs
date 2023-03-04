use std::collections::HashMap;
use rand::Rng;

struct Wallet{
    balance:f32,
    adress:String,
}

struct User{
    name:String,
    phone_number:String,
    wallet:Wallet,  
}

struct WalletService{
    users:HashMap<String,User>,
}

impl WalletService{
    fn new()->WalletService{
        WalletService{
            users:HashMap::new(),
        }
    }


fn create_wallet(&mut self, name:&str, phone_number:&str)->&Wallet{
    let mut rng =rand::thread_rng();
    let address:String=rng.gen_ascii_chars().take(32).collect();
    let wallet=Wallet{
        balance:1.0,
        adress,
    };

    let user=User{
        name:name.to_string(),
        phone_number:phone_number.to_string(),
        wallet,
    };

    self.users.insert(phone_number.to_string(),user);
    &self.users[phone_number].wallet
}

fn get_balance(&self,phone_number:&str)->Option<f32>{
    self.users.get(phone_number).map(|user| user.wallet.balance)
}
}
fn main(){
    let mut wallet_service=WalletService::new();
    let wallet=wallet_service.create_wallet("John","123456789");
    println!("{}'s wallet adress: {}","Jada",wallet.adress);
    println!("{}'s wallet balance: {:?}","Jada",wallet_service.get_balance("123456789"));
}