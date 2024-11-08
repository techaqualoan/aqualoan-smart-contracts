if [[ "$1" ]]
then
    RULE="--rule $1"
fi

certoraRun certora/harness/AquaTokenV3Harness.sol:AquaTokenV3Harness \
    --verify AquaTokenV3Harness:certora/specs/erc20.spec \
    --packages openzeppelin-contracts=lib/openzeppelin-contracts \
    $RULE \
    --solc solc8.13 \
    --optimistic_loop \
    --send_only \
    --cloud \
    --msg "AquaTokenV3:erc20.spec $1" \

